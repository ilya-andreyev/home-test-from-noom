"""
URL configuration for sleepapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as auth_views

from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login", auth_views.obtain_auth_token),
    path("api/ping", views.ping, name="ping"),
    path("api/sleep-log", views.SleepLogView.as_view(), name="sleeplog"),
    path("api/sleep-log/last-30-days", views.SleepLogLast30DaysView.as_view(), name="sleeplog_last_30_days"),
]
