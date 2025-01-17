from django.urls import path
from .views import (
    AgentCtsListCreateView,
    AgentCtsDashboard,
    getSelectedAgentCts,
    UpdateAgentCts,
    OMviewDashboard,
    CDviewDashboard,
    EmployeeDataView,
)

urlpatterns = [
    path('', AgentCtsListCreateView.as_view(), name='agent_cts_list_create'),  # Updated name
    path('dashboard/', AgentCtsDashboard.as_view(), name='agent_cts_dashboard'),  # Updated name
    path('om-view-dashboard/', OMviewDashboard.as_view(), name='agent_cts_dashboard'),  # Updated name
    path('cd-view-dashboard/', CDviewDashboard.as_view(), name='cd-view'),  # Updated name
    path('id/<int:id>/', getSelectedAgentCts.as_view(), name='get_selected_agent_cts'),  # Updated name
    path('update-agent-cts/<int:id>/', UpdateAgentCts.as_view(), name='update_agent_cts'),  # Ensure this name is unique
    path("employee/", EmployeeDataView.as_view(), name="get_employee_data"),  # Fix applied
]
