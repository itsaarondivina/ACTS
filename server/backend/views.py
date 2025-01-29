import datetime
import json
from multiprocessing import connection
from django.http import Http404, JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from .models import Team_Access, User_Admin, Category, DropDownLookup, AgentCts
from .serializers import (
    TeamAccessSerializer,
    UserAdminSerializer,
    CategorySerializer,
    DropdownLookupSerializer,
    AgentctsSerializer,
)
from django.utils.dateparse import parse_datetime
from django.db.models.functions import Coalesce ,Round ,Cast
from django.db.models import Count, Q, Case, When, Value, IntegerField, DecimalField, F , FloatField ,Sum
import requests
from django.http import JsonResponse

def exchange_token(request):
    print("Hello")
    code = request.GET.get('code')
    code_verifier = request.GET.get('codeVerifier') 
    print("Request:", code_verifier)
    print("code:", code)
    if not code or not code_verifier:
        return JsonResponse({'error': 'Authorization code and code_verifier are required'}, status=400)

    payload = {
        'grant_type': 'authorization_code',
        'code': code,
        # 'redirect_uri': 'http://localhost:5173/authorization-code/callback',
        # 'redirect_uri': 'http://127.0.0.1:8000/authorization-code/callback',
        'redirect_uri': 'https://vxi-itech-acts-dtvtech-127333559366.us-central1.run.app/authorization-code/callback', 
        # 'client_id': '0oamtgi9kffnJDVFD5d7', <- Local
        # 'client_id': '0oamtlx0l8bCM4lrm5d7',
        'client_id': '0oamuia55wqxjHKVC5d7',
        'client_secret': '9DaON-kTYvPcS5Ppt-HVfPznC99P3hZ36_hWw0C0fdAaHFhfFDd_IVkfh-rrY51q', #local
        # 'client_secret': 'e9AuvxtcLA5NnhZEtqrFn2EVX3SSTTM3zKrym9k3Q4Gk-OQlTJThwi_7EIywgxxf',
        # 'client_secret': 'nih1z1ws18xgpn6fMl4PKj8Ze4gs_ZCtjEqxu7-LcXpID7bjrhV3n4ewiMV-AIKu',
        'code_verifier': code_verifier,  # Include the code_verifier here
    }
    okta_issuer = "https://dev-97322452.okta.com"

    try:
        # Send the POST request to Okta
        response = requests.post(f'{okta_issuer}/oauth2/v1/token', data=payload)

        # Handle the response
        if response.status_code == 200:
            access_token = response.json().get('access_token')
            print("Access token received:", access_token)
            
            # Now use the access token to fetch user info
            user_info_response = requests.get(
                f'{okta_issuer}/oauth2/v1/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            )
            
            if user_info_response.status_code == 200:     
                user_data = user_info_response.json()  
                hrid = user_data.get('HRID')

                user = User_Admin.objects.filter(HRID=hrid).first()
                if user:
                    userinfo = {
                        'HRID': user_data.get('HRID'),
                        'email': user_data.get('email'),
                        'FirstName': user_data.get('given_name'),
                        'Lastname': user_data.get('family_name'),
                        'Site': user_data.get('site'),
                        'Team': user_data.get('Team'),
                        'Position': user_data.get('position'),
                        'Role': user.Role if user and user.Role else "USER",
                        'profilepicture': f'https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id={hrid}',
                        'name': user_data.get('given_name') + ' ' + user_data.get('family_name'),
                    }
                else:
                    userinfo = {

                        'HRID': user_data.get('HRID'),
                        'email': user_data.get('email'),
                        'FirstName': user_data.get('given_name'),
                        'Lastname': user_data.get('family_name'),
                        'Site': user_data.get('site'),
                        'Team': user_data.get('Team'),
                        'Position': user_data.get('position'),
                        'profilepicture': f'https://timekeeping.vxi.com.ph/Scheduler/GetImage.aspx?id={hrid}',
                        'Role': user.Role if user and user.Role else "USER",

                    }
                
                print("HRID:", userinfo)  

                return JsonResponse(userinfo)  # Return the user data
            else:
                print(f"Error fetching user info: {user_info_response.text}")
                return JsonResponse(user_info_response.json(), status=user_info_response.status_code)  # Return the error response
        else:
            print(f"Error response from token exchange: {response.text}")  # Log the error response
            return JsonResponse(response.json(), status=response.status_code)  # Return the error response
    except requests.RequestException as e:
        # Handle any exception during the request process
        print(f"Request failed: {e}")
        return JsonResponse({'error': 'Failed to exchange token. Please try again later.'}, status=500)


class EmployeeDataView(generics.ListCreateAPIView):
    def get(self, request):
        hrid = request.GET.get("hrid")  # Get the HRID from the query parameters

        if not hrid:
            return JsonResponse({"error": "HRID parameter is required"}, status=400)

        try:
            # Call the external API
            api_url = f"https://employee-api.vxi.com/api/employee/{hrid}/?format=json"
            response = requests.get(api_url)

            # Log the raw response for debugging
            print(f"Response from external API: {response.status_code} - {response.text}")

            # If the API call was not successful, return the error
            if response.status_code != 200:
                return JsonResponse(
                    {"error": f"Failed to fetch data from external API: {response.status_code}"}, 
                    status=response.status_code
                )

            # Parse the JSON response and return it to the frontend
            data = response.json()
            return JsonResponse(data)

        except requests.exceptions.RequestException as e:
            # Handle any errors during the API call
            return JsonResponse({"error": f"Error connecting to external API: {str(e)}"}, status=500)
        
class AgentCtsDashboard(generics.ListCreateAPIView):
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

    def list(self, request, *args, **kwargs):
        # Get filtered queryset
        queryset = self.get_queryset()
        

        # Group by TL_NAME and FULL_NAME, aggregate data
        grouped_data = queryset.values('tl_name', 'full_name').annotate(
            entries_count=Count('id'),  # Count the number of entries
                        
            entries_count_pplan_close=Count(
                Case(
                    When(pplan_close='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(pplan_close='Yes')  # Simply filter by pplan_close='Yes' here
            ),
            
            dispatch_count=Count(
                Case(
                    When(dispatch_call='Dispatch', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(dispatch_call='Dispatch')  # Simply filter by pplan_close='Yes' here
            ),

            dispatch_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('dispatch_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            replacement_count=Count(
                Case(
                    When(dispatch_call='Replacement', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(dispatch_call='Replacement')  # Simply filter by pplan_close='Yes' here
            ),

            replacement_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('replacement_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            transfer_count=Count(
                Case(
                    When(dispatch_call='Replacement', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(transfer_call='Yes')  # Simply filter by pplan_close='Yes' here
            ),

            transfer_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('transfer_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),
            # Count entries with AccountType 'RCI' or 'RIO', ensuring only valid account types are counted
            total_account_type_count=Count(
                Case(
                    When(account_type__in=['RC1', 'RIO'], then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(account_type__in=['RC1', 'RIO'])  # Use 'in' to match either 'RCI' or 'RIO'
            ),
            
            # Count entries with RepeatPrediction 'Yes'
            repeat_prediction_count=Count(
                Case(
                    When(repeat_prediction='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(repeat_prediction='Yes')  # Simply filter by pplan_close='Yes' here
            ),

            issue_resolved_count=Count(
                Case(
                    When(issue_resolved='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(issue_resolved='Yes')  # Simply filter by pplan_close='Yes' here
            ),
            
            # Calculate the repeat rate as percentage (RepeatPredictionCount / TotalAccountTypeCount * 100)
            repeat_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('repeat_prediction_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            resolution_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('issue_resolved_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),
            
            # Close rate calculation based on pplan_close = 'Yes'
            close_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('entries_count_pplan_close') * 100.0 / Count(
                            Case(
                                When(pplan_close='Yes', then=Value(1)),
                                default=Value(0),
                                output_field=IntegerField()
                            )
                        )
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

             #CPI Adjustment
            credit_amount=Sum(
                Case(
                    When(
                        credit_amount__isnull=False,
                        then=Cast('credit_amount', FloatField())
                    ),
                    default=Value(0.0),
                    output_field=FloatField()
                )
            ),

    # Calculate CPC/Adjustments and cast to DecimalField before rounding
            cpc_adjustments=Round(
                Cast(
                    Case(
                        When(
                            entries_count__gt=0,
                            then=F('credit_amount') / F('entries_count')
                        ),
                        default=Value(0.0),
                        output_field=FloatField()
                    ),
                    DecimalField(max_digits=10, decimal_places=2)
                ),
                2
            )

            
        )

       
        # Format the data into the required structure
        formatted_data = {}
        for record in grouped_data:
            tl_name = record['tl_name']
            full_name = record['full_name']
            entries_count = record['entries_count']
            # entries_count_pplan = record['entries_count_pplan_close']
            entries_count_account = record['total_account_type_count']
            repeat_count = record['repeat_prediction_count']
            repeat_rate = record['repeat_rate']
            close_rate = record['close_rate']
            dispatch_rate = record['dispatch_rate']
            replacement_rate = record['replacement_rate']
            cpc_adjustments = record['cpc_adjustments']
            transfer_rate = record['transfer_rate']
            resolution_rate = record['resolution_rate']

            # Ensure TL_NAME group exists
            if tl_name not in formatted_data:
                formatted_data[tl_name] = {"TL_NAME": tl_name, "AGENTS": []}

            # Add agent data to the TL_NAME group
            formatted_data[tl_name]["AGENTS"].append({
                "NAME": full_name,
                "ENTRIES_COUNT": entries_count,
                "ENTRIES_COUNT_Total Account": entries_count_account,
                # "ENTRIES_COUNT_pplan": entries_count_pplan,
                "RepeatCount": repeat_count,
                "REPEAT_RATE": f"{repeat_rate}%",  # Format repeat rate with '%' sign
                "CLOSE_RATE": f"{close_rate}%",  # Format close rate with '%' sign
                "Dispatch_Rate": f"{dispatch_rate}%",  # Format close rate with '%' sign
                "Replacement_Rate": f"{replacement_rate}%",  # Format close rate with '%' sign
                "CPC_Adjustment": f"${cpc_adjustments}",  # Format close rate with '%' sign
                "Transfer_Rate": f"{transfer_rate}%",  # Format close rate with '%' sign
                "Resolution_Rate": f"{resolution_rate}%",  # Format close rate with '%' sign
            })

        # Convert formatted_data dictionary to a list
        response_data = list(formatted_data.values())

        # Return the formatted data as a response
        return Response({
        "formatted_data": response_data,
        "queryset": list(queryset.values())  # Convert queryset to a list of dictionaries
    })


class OMviewDashboard(generics.ListCreateAPIView):
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

    def list(self, request, *args, **kwargs):
        # Get filtered queryset
        queryset = self.get_queryset()
        

        # Group by TL_NAME and FULL_NAME, aggregate data
        grouped_data = queryset.values('tl_name').annotate(
            entries_count=Count('tl_name'),  # Count the number of entries
                        
            entries_count_pplan_close=Count(
                Case(
                    When(pplan_close='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(pplan_close='Yes')  # Simply filter by pplan_close='Yes' here
            ),
            
            dispatch_count=Count(
                Case(
                    When(dispatch_call='Dispatch', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(dispatch_call='Dispatch')  # Simply filter by pplan_close='Yes' here
            ),

            dispatch_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('dispatch_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            replacement_count=Count(
                Case(
                    When(dispatch_call='Replacement', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(dispatch_call='Replacement')  # Simply filter by pplan_close='Yes' here
            ),

            replacement_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('replacement_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            transfer_count=Count(
                Case(
                    When(dispatch_call='Replacement', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(transfer_call='Yes')  # Simply filter by pplan_close='Yes' here
            ),

            transfer_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('transfer_count') * 100.0 / F('entries_count')  # Use entries_count directly
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),
            # Count entries with AccountType 'RCI' or 'RIO', ensuring only valid account types are counted
            total_account_type_count=Count(
                Case(
                    When(account_type__in=['RC1', 'RIO'], then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(account_type__in=['RC1', 'RIO'])  # Use 'in' to match either 'RCI' or 'RIO'
            ),
            
            # Count entries with RepeatPrediction 'Yes'
            repeat_prediction_count=Count(
                Case(
                    When(repeat_prediction='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(repeat_prediction='Yes')  # Simply filter by pplan_close='Yes' here
            ),

            issue_resolved_count=Count(
                Case(
                    When(issue_resolved='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                ),
                filter=Q(issue_resolved='Yes')  # Simply filter by pplan_close='Yes' here
            ),
            
            # Calculate the repeat rate as percentage (RepeatPredictionCount / TotalAccountTypeCount * 100)
            repeat_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('repeat_prediction_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

            resolution_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('issue_resolved_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),
            
            # Close rate calculation based on pplan_close = 'Yes'
            close_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('entries_count_pplan_close') * 100.0 / Count(
                            Case(
                                When(pplan_close='Yes', then=Value(1)),
                                default=Value(0),
                                output_field=IntegerField()
                            )
                        )
                    ),
                    default=Value(0),
                    output_field=DecimalField(max_digits=5, decimal_places=2)
                ),
                2  # Round to 2 decimal places
            ),

             #CPI Adjustment
            credit_amount=Sum(
                Case(
                    When(
                        credit_amount__isnull=False,
                        then=Cast('credit_amount', FloatField())
                    ),
                    default=Value(0.0),
                    output_field=FloatField()
                )
            ),

    # Calculate CPC/Adjustments and cast to DecimalField before rounding
            cpc_adjustments=Round(
                Cast(
                    Case(
                        When(
                            entries_count__gt=0,
                            then=F('credit_amount') / F('entries_count')
                        ),
                        default=Value(0.0),
                        output_field=FloatField()
                    ),
                    DecimalField(max_digits=10, decimal_places=2)
                ),
                2
            )

            
        )

       
        # Format the data into the required structure
        formatted_data = {}
        for record in grouped_data:
            tl_name = record['tl_name']
            # full_name = record['full_name']
            entries_count = record['entries_count']
            # entries_count_pplan = record['entries_count_pplan_close']
            entries_count_account = record['total_account_type_count']
            repeat_count = record['repeat_prediction_count']
            repeat_rate = record['repeat_rate']
            close_rate = record['close_rate']
            dispatch_rate = record['dispatch_rate']
            replacement_rate = record['replacement_rate']
            cpc_adjustments = record['cpc_adjustments']
            transfer_rate = record['transfer_rate']
            resolution_rate = record['resolution_rate']

            # Ensure TL_NAME group exists
            if tl_name not in formatted_data:
                formatted_data[tl_name] = {
                "TL_NAME": tl_name,
                "ENTRIES_COUNT": entries_count,
                "REPEAT_RATE": f"{repeat_rate}%",  # Add percentage
                "CLOSER_RATE": f"{close_rate}%",  # Add percentage
                "DISPATCH_RATE": f"{dispatch_rate}%",  # Add percentage
                "REPLACEMENT_RATE": f"{replacement_rate}%",  # Add percentage
                "CPC_ADJ": f"${cpc_adjustments}",  # Leave as-is if not a rate
                "TRANSFER_RATE": f"{transfer_rate}%",  # Add percentage
                "RESOLUTION_RATE": f"{resolution_rate}%",  # Add percentage
            }


            # Add agent data to the TL_NAME group
            # formatted_data[tl_name]["AGENTS"].append({
            #     # "NAME": full_name,
            #     "ENTRIES_COUNT": entries_count,
            #     "ENTRIES_COUNT_Total Account": entries_count_account,
            #     # "ENTRIES_COUNT_pplan": entries_count_pplan,
            #     "RepeatCount": repeat_count,
            #     "REPEAT_RATE": f"{repeat_rate}%",  # Format repeat rate with '%' sign
            #     "CLOSE_RATE": f"{close_rate}%",  # Format close rate with '%' sign
            #     "Dispatch_Rate": f"{dispatch_rate}%",  # Format close rate with '%' sign
            #     "Replacement_Rate": f"{replacement_rate}%",  # Format close rate with '%' sign
            #     "CPC_Adjustment": f"${cpc_adjustments}",  # Format close rate with '%' sign
            #     "Transfer_Rate": f"{transfer_rate}%",  # Format close rate with '%' sign
            #     "Resolution_Rate": f"{resolution_rate}%",  # Format close rate with '%' sign
            # })

        # Convert formatted_data dictionary to a list
        response_data = list(formatted_data.values())

        # Return the formatted data as a response
        return Response({
        "formatted_data": response_data,
        "queryset": list(queryset.values())  # Convert queryset to a list of dictionaries
    })


class CDviewDashboard(generics.ListCreateAPIView):
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

    def list(self, request, *args, **kwargs):
        # Get filtered queryset
        queryset = self.get_queryset()

        # Group by TL_NAME and FULL_NAME, aggregate data
        grouped_data = queryset.values('sub_area').annotate(
            entries_count=Count('sub_area'),

            entries_count_pplan_close=Count(
                Case(
                    When(pplan_close='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            dispatch_count=Count(
                Case(
                    When(dispatch_call='Dispatch', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            dispatch_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('dispatch_count') * 100.0 / F('entries_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            replacement_count=Count(
                Case(
                    When(dispatch_call='Replacement', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            replacement_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('replacement_count') * 100.0 / F('entries_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            transfer_count=Count(
                Case(
                    When(transfer_call='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            transfer_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('transfer_count') * 100.0 / F('entries_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            total_account_type_count=Count(
                Case(
                    When(account_type__in=['RC1', 'RIO'], then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            repeat_prediction_count=Count(
                Case(
                    When(repeat_prediction='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            issue_resolved_count=Count(
                Case(
                    When(issue_resolved='Yes', then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            ),

            repeat_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('repeat_prediction_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            resolution_rate=Round(
                Case(
                    When(
                        total_account_type_count__gt=0,
                        then=F('issue_resolved_count') * 100.0 / F('total_account_type_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            close_rate=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('entries_count_pplan_close') * 100.0 / F('entries_count')
                    ),
                    default=Value(0),
                    output_field=FloatField()
                ),
                2
            ),

            credit_amount=Sum(
                Case(
                    When(
                        credit_amount__isnull=False,
                        then=Cast('credit_amount', FloatField())
                    ),
                    default=Value(0.0),
                    output_field=FloatField()
                )
            ),

            cpc_adjustments=Round(
                Case(
                    When(
                        entries_count__gt=0,
                        then=F('credit_amount') / F('entries_count')
                    ),
                    default=Value(0.0),
                    output_field=FloatField()
                ),
                2
            )
        )

        # Format the data into the required structure
        formatted_data = {}
        for record in grouped_data:
            sub_area = record['sub_area']
            entries_count = record['entries_count']
            repeat_rate = record['repeat_rate']
            close_rate = record['close_rate']
            dispatch_rate = record['dispatch_rate']
            replacement_rate = record['replacement_rate']
            cpc_adjustments = record['cpc_adjustments']
            transfer_rate = record['transfer_rate']
            resolution_rate = record['resolution_rate']

            if sub_area not in formatted_data:
                formatted_data[sub_area] = {
                    "TL_NAME": sub_area,
                    "ENTRIES_COUNT": entries_count,
                    "REPEAT_RATE": f"{repeat_rate}%",
                    "CLOSE_RATE": f"{close_rate}%",
                    "DISPATCH_RATE": f"{dispatch_rate}%",
                    "REPLACEMENT_RATE": f"{replacement_rate}%",
                    "CPC_ADJ": f"${cpc_adjustments}",
                    "TRANSFER_RATE": f"{transfer_rate}%",
                    "RESOLUTION_RATE": f"{resolution_rate}%",
                }

        response_data = list(formatted_data.values())

        return Response({
            "formatted_data": response_data,
            "queryset": list(queryset.values())
        })

class getSelectedAgentCts(generics.ListCreateAPIView):
    queryset = AgentCts.objects.all()  # Default queryset to get all AgentCts objects
    serializer_class = AgentctsSerializer

    def get_queryset(self):
        # Get the 'id' parameter from URL kwargs
        agent_id = self.kwargs.get('id', None)

        # If id is provided, filter the queryset by that id
        if agent_id is not None:
            queryset = AgentCts.objects.filter(id=agent_id)
        else:
            queryset = AgentCts.objects.all()  # Return all if no id is provided

        return queryset
    

class UpdateAgentCts(generics.UpdateAPIView):
    queryset = AgentCts.objects.all()  # Default queryset to get all AgentCts objects
    serializer_class = AgentctsSerializer

    def get_object(self):
        # Get the 'id' parameter from URL kwargs
        agent_id = self.kwargs.get('id')

        try:
            # Fetch the agent by ID, raises Http404 if not found
            return AgentCts.objects.get(id=agent_id)
        except AgentCts.DoesNotExist:
            raise Http404("AgentCts not found")

    def update(self, request, *args, **kwargs):
        # Retrieve the object (this will trigger get_object)
        agent = self.get_object()

        # Now, we can update the fields
        # Call the serializer to validate and update the object
        serializer = self.get_serializer(agent, data=request.data, partial=True)  # partial=True allows partial updates

        # Validate the incoming data
        serializer.is_valid(raise_exception=True)

        # Save the updated object
        serializer.save()

        return Response(serializer.data, status=200)

    

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
    

    
# class AgentCtsDashboard(generics.ListCreateAPIView):
#     serializer_class = AgentctsSerializer

#     def get_queryset(self):
#         queryset = AgentCts.objects.all()

#         # Get query parameters
#         start_date = self.request.query_params.get('start_date')
#         end_date = self.request.query_params.get('end_date')

#         # Filter by start_date
#         if start_date:
#             queryset = queryset.filter(date_created__gte=start_date)
        
#         # Filter by end_date
#         if end_date:
#             queryset = queryset.filter(date_created__lte=end_date)

#         return queryset

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