from django.contrib import admin
from .models import Team_Access, User_Admin

# Register your model here
admin.site.register(Team_Access)
admin.site.register(User_Admin)