from django.urls import path
from .views import UserAdminListCreateView, UserAdminDetailView

urlpatterns = [
    path('', UserAdminListCreateView.as_view(), name='user_admin_list_create'),
    path('<int:pk>/', UserAdminDetailView.as_view(), name='user_admin_detail'),
]
