from django.urls import path
from .views import DropdownlookupListCreateView

urlpatterns = [
    path('', DropdownlookupListCreateView.as_view(), name='user_admin_list_create'),
]
