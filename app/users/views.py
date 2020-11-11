from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from django.contrib.auth import authenticate, login, logout, get_user_model

from users.serializers import UserSerializer, UpdatePasswordSerializer, UpdateEmailSerializer

class CreateUserView(CreateAPIView):
    """
    API View to create new user.
    endpoint: user/signup
    params: none
    """
    serializer_class = UserSerializer

class UserLoginView(APIView):
    """
    API View to login existing user.
    endpoint: user/login
    params: none
    """
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        error = None
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if email is None or password is None:
            return Response('email and password are required', status=HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return Response(HTTP_200_OK)
        return Response({'error': 'Wrong credentials'}, status=HTTP_400_BAD_REQUEST)

class CheckUserView(APIView):
    """
    API View to check if user is logged in or not
    endpoint: user/isauthenticated
    params: none
    """
    def get(self, request):
        is_logged_in = False
        if request.user.is_authenticated:
            is_logged_in = True
        return Response({'user': is_logged_in}, status=HTTP_200_OK)

class UserLogoutView(APIView):
    """
    API View to logout current user
    endpoint: user/logout
    params: none
    """ 
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logout(request)
            return Response(status=HTTP_200_OK)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)

class UserDetailsView(RetrieveAPIView):
    """
    API View to get user details.
    endpoint: user/
    params: none
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(instance=self.request.user)
        return Response(serializer.data, HTTP_200_OK)

class UpdatePasswordView(APIView):
    """
    API View to change password.
    endpoint: user/change_pwd
    params: none
    """
    serializer_class = UpdatePasswordSerializer

    def put(self, request, *args, **kwargs):
        self.object = self.request.user
        serializer = UpdatePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, 
                                status=HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class UpdateEmailView(APIView):
    """
    API View to change Email.
    endpoint: user/change_mail
    params: none
    """
    serializer_class = UpdateEmailSerializer

    def put(self, request, *args, **kwargs):
        self.object = self.request.user
        serializer = UpdateEmailSerializer(data=request.data)

        if serializer.is_valid():
            password = serializer.data.get("password")
            if not self.object.check_password(password):
                return Response({"error": ["Wrong password."]},
                                status=HTTP_400_BAD_REQUEST)
            self.object.email = serializer.data.get("new_email")
            self.object.save()
            return Response(status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
