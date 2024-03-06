from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers

class CustomRegisterSerializer(RegisterSerializer):
    
    username = serializers.CharField(label='Username', required=True)
    email = None

    # Add any additional fields you want for user registration
    first_name = serializers.CharField(label='First Name', required=True)
    last_name = serializers.CharField(label='Last Name', required=True)


    def save(self, request):
        user = super().save(request)
        return user
    

class CustomLoginSerializer(LoginSerializer):

    # Add any additional fields you want for user registration
    username = serializers.CharField(label='Username', required=True)
    email = None

    def validate(self, attrs):
        # You can add custom validation logic here if needed
        # You can use the attrs dictionary to access the input values

        # Perform the default validation from the parent class
        data = super().validate(attrs)
        return data