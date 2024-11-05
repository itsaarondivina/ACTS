from django.urls import path
from .views import CategoryListCreateView

urlpatterns = [
    path('', CategoryListCreateView.as_view(), name='user_admin_list_create'),
]
