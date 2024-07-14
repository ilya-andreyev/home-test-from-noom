from django.contrib import admin
from .models import SleepLog

@admin.register(SleepLog)
class SleepLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'feeling', 'bed_time_start', 'bed_time_end')
    list_filter = ('user', 'feeling', 'bed_time_start', 'bed_time_end')
    search_fields = ('user__username', 'bed_time_start', 'bed_time_end')
