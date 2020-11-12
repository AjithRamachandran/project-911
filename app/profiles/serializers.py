from rest_framework.serializers import ModelSerializer

from profiles.models import Profile

class ProfileSerializer(ModelSerializer):
    """
    Serializer for Profile.
    """
    class Meta:
        model = Profile
        exclude = ('user',)
