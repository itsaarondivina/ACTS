# serializers.py
from rest_framework import serializers
from .models import Team_Access,User_Admin

class TeamAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team_Access
        fields = '__all__'


class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Admin
        fields = '__all__'

