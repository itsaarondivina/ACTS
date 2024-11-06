from django.urls import path
from .views import DropdownlookupListCreateView, DropdownlookupDetailView

urlpatterns = [
    path('', DropdownlookupListCreateView.as_view(), name='dropdownlookup-list-create'),  # For listing and creating
    path('<int:pk>/', DropdownlookupDetailView.as_view(), name='dropdownlookup-detail'),  # For retrieving, updating, and deleting an individual item
]
