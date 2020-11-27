from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from core.permissions import IsOwnerOrReadOnly
from profiles.models import Profile
from profiles.serializers import ProfileSerializer

class ProfileApiView(RetrieveAPIView):
    """
    API View to get profile details of current user.
    endpoint: profile/
    params: none
    """
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = Profile.objects.get(user=self.request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=HTTP_200_OK)

class UserProfileApiView(RetrieveAPIView):
    """
    API View to get other users' profile details.
    endpoint: profile/u/<int:uid>
    params: uid -> User Id
    """
    serializer_class = ProfileSerializer
    lookup_url_kwarg = 'uid'
    queryset = Profile.objects.all()

class ProfileEditApiView(APIView):
    """
    API View to update user profile
    endpoint: profile/edit
    params: none
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        profile = Profile.objects.get(user=self.request.user)
        self.check_object_permissions(self.request, profile)
        return profile

    def patch(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=HTTP_200_OK)
        return Response(data=serializer.errors, status=HTTP_400_BAD_REQUEST)

class ListProfileApiView(ListAPIView):
    """
    API View to get profile details of current user.
    endpoint: profile/all
    params: none
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
