# serializers.py
from rest_framework import serializers
from .models import Team_Access,User_Admin, Category, DropDownLookup, AgentCts

class TeamAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team_Access
        fields = '__all__'


class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Admin
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class DropdownLookupSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropDownLookup
        fields = '__all__'


class AgentctsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentCts
        fields = '__all__'




