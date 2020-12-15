from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from core.permissions import IsOwnerOrReadOnly, IsSameDomain
from profiles.models import Profile
from profiles.serializers import ProfileSerializer

class ProfileApiView(RetrieveAPIView):
    """
    API View to get profile details of current user.
    endpoint: profile/
    params: none
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsSameDomain]

    def retrieve(self, request, *args, **kwargs):
        instance = Profile.objects.get(user=self.request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=HTTP_200_OK)

class ProfileEditApiView(APIView):
    """
    API View to update user profile
    endpoint: profile/edit
    params: none
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly, IsSameDomain]

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

class ListProfileApiView(APIView):
    """
    API View to get profile details of current user.
    endpoint: profile/all
    params: none
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsSameDomain]

    def get(self, request):
        bg = self.request.query_params.get('bg', None)
        district = self.request.query_params.get('district', None)
        
        if(district == 'District' or district == ''):
            district = None
        
        if(bg == 'Blood Group' or bg == ''):
            bg = None

        if bg is None and district is None:
            self.profile = Profile.objects.all()

        if bg is not None and district is None:
            self.profile = Profile.objects.filter(blood_group=bg)

        if bg is None and district is not None:
            self.profile = Profile.objects.filter(district=district)

        if bg is not None and district is not None:
            self.profile = Profile.objects.filter(blood_group=bg, district=district)

        serializer = ProfileSerializer(self.profile, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
