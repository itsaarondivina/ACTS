from rest_framework import generics
from .models import Team_Access, User_Admin
from .serializers import TeamAccessSerializer, UserAdminSerializer

# List all entries or create a new one
class TeamAccessListCreateView(generics.ListCreateAPIView):
    queryset = Team_Access.objects.all()
    serializer_class = TeamAccessSerializer

# Retrieve, update, or delete a specific entry
class TeamAccessDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team_Access.objects.all()
    serializer_class = TeamAccessSerializer

class UserAdminListCreateView(generics.ListCreateAPIView):
    queryset = User_Admin.objects.all()
    serializer_class = UserAdminSerializer

    def get_queryset(self):
        hrid = self.request.query_params.get('HRID', None)
        if hrid is not None:
            return self.queryset.filter(HRID=hrid)  # Adjust 'hrid' to your actual field name
        return self.queryset

# Retrieve, update, or delete a specific entry
class UserAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User_Admin.objects.all()
    serializer_class = UserAdminSerializer
