import datetime
import json
from multiprocessing import connection
from django.http import JsonResponse
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
    serializer_class = AgentctsSerializer

    def get_queryset(self):
        queryset = AgentCts.objects.all()

        # Get query parameters
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        # Filter by start_date
        if start_date:
            queryset = queryset.filter(date_created__gte=start_date)
        
        # Filter by end_date
        if end_date:
            queryset = queryset.filter(date_created__lte=end_date)

        return queryset

# class AgentCtsListCreateView(generics.ListCreateAPIView):
#     queryset = AgentCts.objects.all()
#     serializer_class = AgentctsSerializer

#     def get_queryset(self):
#         # Get the base queryset
#         queryset = super().get_queryset()

#         # Get query parameters
#         start_date = self.request.query_params.get('start_date', None)
#         end_date = self.request.query_params.get('end_date', None)

#         # Apply filtering if dates are provided
#         if start_date:
#             start_date = parse_datetime(start_date)
#             if start_date:
#                 queryset = queryset.filter(date_created__gte=start_date)
        
#         if end_date:
#             end_date = parse_datetime(end_date)
#             if end_date:
#                 queryset = queryset.filter(date_created__lte=end_date)

#         # Return the filtered or unfiltered queryset
#         return queryset



# backend/views.py
# @require_http_methods(["GET", "POST"])
def view_report(request):
    try:
        if request.method == "POST":
            # Parse incoming JSON data
            data = json.loads(request.body)
            start_date = data.get("startDate")
            end_date = data.get("endDate")
            select_view = data.get("selectView")
            search_view = data.get("searchView")
        elif request.method == "GET":
            # Parse parameters from query string
            start_date = request.GET.get("startDate")
            end_date = request.GET.get("endDate")
            select_view = request.GET.get("selectView")
            search_view = request.GET.get("searchView")
        else:
            return JsonResponse({"error": "Unsupported method"}, status=405)

        # Execute the function
        with connection.cursor() as cursor:
            query = """
            SELECT * FROM get_report(%s, %s, %s, %s);
            """
            cursor.execute(query, [start_date, end_date, select_view, search_view])
            result = cursor.fetchall()

            # Get column names for the result
            columns = [col[0] for col in cursor.description]

        # Transform result into a list of dictionaries
        result_data = [dict(zip(columns, row)) for row in result]

        return JsonResponse({
            "result": result_data
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    

def get_agentcts_data(request):
    if request.method == 'POST':  # Ensure only POST requests are accepted
        # Your logic to fetch data goes here
        data = AgentCts.objects.all()  # Adjust this as per your needs
        result = list(data.values())  # Convert queryset to list of dicts
        return JsonResponse({"result": result})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)