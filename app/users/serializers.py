from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import CharField

class UserSerializer(ModelSerializer):
    """
    Serializer for User.
    """
    class Meta:
        model = get_user_model()
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 6}}

    def create(self, validated_data):
        """
        Create a new user with encrypted password.
        """
        user = get_user_model().objects.create_user(**validated_data)
        return user

class UpdatePasswordSerializer(ModelSerializer):
    """
    Serializer for password change.
    """
    old_password = CharField(required=True)
    new_password = CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ('old_password', 'new_password')

class UpdateEmailSerializer(ModelSerializer):
    """
    Serializer for email change
    """
    new_email = CharField(required=True)
    password = CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ('new_email', 'password')
