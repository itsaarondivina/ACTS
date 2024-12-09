from django.urls import path
from .views import get_agentcts_data

urlpatterns = [
    path('', get_agentcts_data, name='get_agentcts_data'),
]
