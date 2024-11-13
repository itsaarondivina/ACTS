from django.contrib import admin
from .models import Team_Access, User_Admin, Category, DropDownLookup, AgentCts

# Register your model here
admin.site.register(Team_Access)
admin.site.register(User_Admin)
admin.site.register(Category)
admin.site.register(DropDownLookup)
admin.site.register(AgentCts)