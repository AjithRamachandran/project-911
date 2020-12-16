from django.contrib.auth import get_user_model
from django.urls import reverse_lazy
from django.conf import settings

# constants

CREATE_USER_URL = reverse_lazy('users:signup')
LOGIN_USER_URL = reverse_lazy('users:login')
CHECK_USER_URL = reverse_lazy('users:check_user')
GET_USER_URL = reverse_lazy('users:user_details')
LOGOUT_USER_URL = reverse_lazy('users:logout')
CHANGE_PWD_URL = reverse_lazy('users:change_pwd')
CHANGE_MAIL_URL = reverse_lazy('users:change_mail')
GET_PROFILE_URL = reverse_lazy('profiles:get_profile')
EDIT_PROFILE_URL = reverse_lazy('profiles:profile_edit')
GET_BLOOD_BANKS_URL = reverse_lazy('bb:blood_banks')

# end of constants

class UtilityFunctions():
    @staticmethod
    def create_user(**params):
        return get_user_model().objects.create_user(**params)

    @staticmethod
    def check_client_ip(request):
        url = request.META.get('HTTP_REFERER','')
        if url in settings.WHITELIST_DOMAINS:
            return True
        return False
