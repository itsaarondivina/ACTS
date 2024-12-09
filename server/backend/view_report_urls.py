from django.urls import path
from .views import view_report

urlpatterns = [
    path('', view_report, name='view_report')
]
