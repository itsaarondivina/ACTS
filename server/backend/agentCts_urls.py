from django.urls import path
from .views import AgentCtsListCreateView, AgentCtsDashboard

urlpatterns = [
    path('', AgentCtsListCreateView.as_view(), name='agent_cts_create_view'),
    path('dashboard/', AgentCtsDashboard.as_view(), name='agent_cts_create_view'),
]
