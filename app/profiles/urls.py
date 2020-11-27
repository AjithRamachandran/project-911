from django.urls import path

from profiles.views import ListProfileApiView, ProfileApiView, UserProfileApiView, ProfileEditApiView

app_name = 'profiles'

urlpatterns = [
    path('', ProfileApiView.as_view(), name='get_profile'),
    path('u/<int:uid>', UserProfileApiView.as_view(), name='user_profile'),
    path('edit/', ProfileEditApiView.as_view(), name='profile_edit'),
    path('all/', ListProfileApiView.as_view(), name='get_profiles')
]
