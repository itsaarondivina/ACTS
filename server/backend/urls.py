
from django.urls import path
from .views import TeamAccessListCreateView, TeamAccessDetailView

urlpatterns = [
    path('', TeamAccessListCreateView.as_view(), name='team_access_list_create'),
    path('<int:pk>/', TeamAccessDetailView.as_view(), name='team_access_detail'),
]
