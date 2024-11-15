from django.db import models

class Team_Access(models.Model):
    id = models.AutoField(primary_key=True)  # Automatically increments
    project_region = models.CharField(max_length=10, null=False)
    project_id = models.CharField(max_length=100, null=False)
    project_site = models.CharField(max_length=100, null=True)  # Optional field
    project_description = models.CharField(max_length=100, null=False)
    is_active = models.BooleanField(default=True, null=False)  # Default to True if not specified
    date_created = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    date_updated = models.DateTimeField(auto_now=True)  # Automatically updated on save
    created_by = models.CharField(max_length=250, null=False)
    updated_by = models.CharField(max_length=250, null=False)

    def __str__(self):
        return self.project_id  # or any other field that makes sense as a string representation

class User_Admin(models.Model):
    id = models.AutoField(primary_key=True)  # Automatically increments
    HRID = models.CharField(max_length=10, null=False)
    FirstName = models.CharField(max_length=100, null=False)
    LastName = models.CharField(max_length=100, null=True)  # Optional field
    MiddleName = models.CharField(max_length=100, null=False)
    Role = models.CharField(max_length=1, null=False)
    BuildingAssignment = models.CharField(max_length=20, null=False)
    SamAccount = models.CharField(max_length=20, null=False)
    Email = models.CharField(max_length=100, null=False)
    Team = models.CharField(max_length=100, null=False)
    LineofBusiness = models.CharField(max_length=100, null=False)
    IsActive = models.BooleanField(default=True, null=False)
    Date_Created = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    Date_Updated = models.DateTimeField(auto_now=True)  # Automatically updated on save
    Created_by = models.CharField(max_length=250, null=False)
    Updated_by = models.CharField(max_length=250, null=False)

    def __str__(self):
        return self.HRID
    

class Category(models.Model):  # Replace 'YourModelName' with an appropriate name for your model
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=100, null=True, blank=True)  # Optional field
    is_active = models.BooleanField(default=True)
    created_by = models.CharField(max_length=150, null=False)
    updated_by = models.CharField(max_length=150, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title  # or any other field that makes sense as a string representation

class DropDownLookup (models.Model):
    id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=250, null=False)
    description = models.CharField(max_length=100, null=True, blank=True)  # Optional field
    category_id = models.IntegerField(null=False)
    is_active = models.BooleanField(default=True, null=False)
    created_by = models.CharField(max_length=150, null=False)
    updated_by = models.CharField(max_length=150, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item_name
    
class AgentCts (models.Model):
    id = models.AutoField(primary_key=True)
    call_type = models.CharField(max_length=100, null=True)  # Optional field
    account_type = models.CharField(max_length=250, null=True)
    case_id = models.CharField(max_length=250, null=True)
    area = models.CharField(max_length=250, null=True)
    sub_area = models.CharField(max_length=250, null=True)
    transfer_call = models.CharField(max_length=250, null=True)
    transfer_destination = models.CharField(max_length=250, null=True)
    transfer_attuid = models.CharField(max_length=250, null=True)
    issue_resolved = models.CharField(max_length=250, null=True)
    is_customer_happy = models.CharField(max_length=250, null=True)
    provide_credit = models.CharField(max_length=250, null=True)
    credit_amount = models.CharField(max_length=250, null=True)
    credit_attuid = models.CharField(max_length=250, null=True)
    appointment_sameday = models.CharField(max_length=250, null=True)
    appointment_sameday_2 = models.CharField(max_length=250, null=True)
    focus_driver = models.CharField(max_length=250, null=True)
    focus_driver_2 = models.CharField(max_length=250, null=True)
    repeat_prediction = models.CharField(max_length=250, null=True)
    pplan_close = models.CharField(max_length=250, null=True)
    pplan_close_2 = models.CharField(max_length=250, null=True)
    dispatch_call = models.CharField(max_length=250, null=True)
    due_date = models.CharField(max_length=250, null=True)
    select_time = models.CharField(max_length=250, null=True)
    dispatch_equipment = models.CharField(max_length=250, null=True)
    wmt = models.CharField(max_length=250, null=True)
    wmt_2 = models.CharField(max_length=250, null=True)
    tool_issue= models.CharField(max_length=250, null=True)
    tool_issue_2= models.CharField(max_length=250, null=True)
    is_active = models.BooleanField(default=True, null=False)
    created_by = models.CharField(max_length=150, null=False)
    updated_by = models.CharField(max_length=150, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    full_name = models.CharField(max_length=150, null=True)
    region = models.CharField(max_length=150, null=True)
    tl_name = models.CharField(max_length=150, null=True)
    tl_hrid = models.CharField(max_length=150, null=True)
    om_name = models.CharField(max_length=150, null=True)
    om_hrid = models.CharField(max_length=150, null=True)
    projectId = models.CharField(max_length=150, null=True)


    def __str__(self):
        return self.case_id