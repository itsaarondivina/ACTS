from rest_framework import generics
from .models import Team_Access, User_Admin,Category, DropDownLookup,AgentCts
from .serializers import TeamAccessSerializer, UserAdminSerializer,CategorySerializer, DropdownLookupSerializer, AgentctsSerializer
from django.utils.dateparse import parse_datetime  # <-- Add this import

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
        # Get the 'HRID' and 'SamAccount' parameters from the query string
        hrid = self.request.query_params.get('HRID', None)
        sam_account = self.request.query_params.get('SamAccount', None)
        
        # Filter the queryset based on the provided parameters
        queryset = User_Admin.objects.all()
        if hrid is not None:
            queryset = queryset.filter(HRID=hrid)  # Filter based on HRID
        if sam_account is not None:
            queryset = queryset.filter(SamAccount=sam_account)  # Filter based on SamAccount

        return queryset


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


class AgentCtsListCreateView(generics.ListCreateAPIView):
    queryset = AgentCts.objects.all()
    serializer_class = AgentctsSerializer

    def get_queryset(self):
        # Get the base queryset
        queryset = super().get_queryset()

        # Get query parameters
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)

        # Apply filtering if dates are provided
        if start_date:
            start_date = parse_datetime(start_date)
            if start_date:
                queryset = queryset.filter(date_created__gte=start_date)
        
        if end_date:
            end_date = parse_datetime(end_date)
            if end_date:
                queryset = queryset.filter(date_created__lte=end_date)

        # Return the filtered or unfiltered queryset
        return queryset

