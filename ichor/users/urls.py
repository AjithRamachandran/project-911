from django.urls import path

from users.views import (
    CreateUserView,
    UserLogoutView,
    UserLoginView,
    CheckUserView,
    UpdatePasswordView,
    UpdateEmailView,
    UserDetailsView,
)

app_name = 'users'

urlpatterns = [
    path('', UserDetailsView.as_view(), name='user_details'),
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('change_pwd/', UpdatePasswordView.as_view(), name='change_pwd'),
    path('change_mail/', UpdateEmailView.as_view(), name='change_mail'),
    path('isauthenticated/', CheckUserView.as_view(), name='check_user'),
]
