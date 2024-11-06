from rest_framework import generics
from .models import Team_Access, User_Admin,Category, DropDownLookup
from .serializers import TeamAccessSerializer, UserAdminSerializer,CategorySerializer, DropdownLookupSerializer

# List all entries or create a new one
class TeamAccessListCreateView(generics.ListCreateAPIView):
    queryset = Team_Access.objects.all()
    serializer_class = TeamAccessSerializer

    def get_queryset(self):
        projectid = self.request.query_params.get('project_id', None)
        if projectid is not None:
            return self.queryset.filter(project_id=projectid)  # Adjust 'hrid' to your actual field name
        return self.queryset
# Retrieve, update, or delete a specific entry
class TeamAccessDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team_Access.objects.all()
    serializer_class = TeamAccessSerializer
    
    

class UserAdminListCreateView(generics.ListCreateAPIView):
    queryset = User_Admin.objects.all()  # Default queryset to get all objects
    serializer_class = UserAdminSerializer

    def get_queryset(self):
        # Get the 'HRID' parameter from the query string
        hrid = self.request.query_params.get('HRID', None)
        
        # If 'HRID' is provided, filter by it
        if hrid is not None:
            return User_Admin.objects.filter(HRID=hrid)  # Filter based on HRID
        
        # If 'HRID' is not provided, return all objects
        return User_Admin.objects.all()  # Return all User_Admin objects


# Retrieve, update, or delete a specific entry
class UserAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User_Admin.objects.all()
    serializer_class = UserAdminSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()  # Default queryset to get all objects
    serializer_class = CategorySerializer


class DropdownlookupListCreateView(generics.ListCreateAPIView):
    queryset = DropDownLookup.objects.all()  # Default queryset to get all objects
    serializer_class = DropdownLookupSerializer

class DropdownlookupDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DropDownLookup.objects.all()  # Queryset to get all objects
    serializer_class = DropdownLookupSerializer
    lookup_field = 'pk'