from django.urls import path
from .views import AgentCtsListCreateView

urlpatterns = [
    path('', AgentCtsListCreateView.as_view(), name='agent_cts_create_view'),
]
