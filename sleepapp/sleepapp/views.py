import json
from datetime import timedelta
from django.utils import timezone
from django.db.models import Avg, Count, F, ExpressionWrapper, DurationField
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from rest_framework.views import APIView
from django.http import JsonResponse

from .models import SleepLog, SleepLogSerializer
from .validation import parse_and_validate_datetime, validate_feeling_field, validate_bed_time_sleep_interval

@api_view(['GET'])
def ping(request):
    return Response("pong")

class SleepLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        date = request.GET.get("date")
        parsed_date = parse_and_validate_datetime(date, "date")

        sleep_log = SleepLog.objects.filter(bed_time_end__date=parsed_date.date(), user_id=request.user.id).order_by("-id").first()
        serialized_obj = SleepLogSerializer(instance=sleep_log).data if sleep_log else None

        return JsonResponse(serialized_obj, safe=False)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        bed_time_start = parse_and_validate_datetime(data["bedTimeStart"], "bedTimeStart")
        bed_time_end = parse_and_validate_datetime(data["bedTimeEnd"], "bedTimeEnd")
        feeling = validate_feeling_field(data["feeling"], "feeling")
        validate_bed_time_sleep_interval(bed_time_start, bed_time_end)

        existing_sleep_log = SleepLog.objects.filter(
            user_id=request.user.id,
            bed_time_end__date=bed_time_end.date()
        ).first()

        if existing_sleep_log:
            existing_sleep_log.bed_time_start = bed_time_start
            existing_sleep_log.bed_time_end = bed_time_end
            existing_sleep_log.feeling = feeling
            existing_sleep_log.save()

            serialized_obj = SleepLogSerializer(instance=existing_sleep_log).data
            return JsonResponse(serialized_obj, safe=False)
        else:
            sleep_log_item = SleepLog.objects.create(
                bed_time_start = bed_time_start,
                bed_time_end = bed_time_end,
                feeling = feeling,
                user_id = request.user.id
            )

        serialized_obj = SleepLogSerializer(instance=sleep_log_item).data
        return JsonResponse(serialized_obj, safe=False)

class SleepLogLast30DaysView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        end_date = timezone.now().replace(hour=23, minute=59, second=59, microsecond=999999)
        start_date = end_date - timedelta(days=30)
        sleep_logs = SleepLog.objects.filter(
            bed_time_end__range=[start_date, end_date],
            user_id=request.user.id
        ).order_by('-bed_time_end')

        if not sleep_logs.exists():
            return JsonResponse(None, safe=False)

        serialized_objs = SleepLogSerializer(sleep_logs, many=True).data

        sleep_logs_with_duration = sleep_logs.annotate(
            duration=ExpressionWrapper(F('bed_time_end') - F('bed_time_start'), output_field=DurationField())
        )
        average_total_time_in_ISO_8601_format = sleep_logs_with_duration.aggregate(Avg('duration'))['duration__avg']

        if average_total_time_in_ISO_8601_format:
            average_total_time_in_bed_seconds = int(average_total_time_in_ISO_8601_format.total_seconds())
        else:
            average_total_time_in_bed_seconds = 0

        feeling_frequencies = sleep_logs.values('feeling').annotate(count=Count('feeling')).order_by('feeling')
        feeling_counts = {
            "1": next((item['count'] for item in feeling_frequencies if item['feeling'] == 1), 0),
            "2": next((item['count'] for item in feeling_frequencies if item['feeling'] == 2), 0),
            "3": next((item['count'] for item in feeling_frequencies if item['feeling'] == 3), 0),
        }

        response_data = {
            "sleepLogs": serialized_objs,
            "averageTotalTimeInBedSeconds": average_total_time_in_bed_seconds,
            "dateRange": {"start": start_date.date(), "end": end_date.date()},
            "feelingFrequencies": feeling_counts
        }

        return JsonResponse(response_data, safe=False)
