from django.contrib.auth import get_user_model
from django.urls import reverse

# constants

CREATE_USER_URL = reverse('users:signup')
LOGIN_USER_URL = reverse('users:login')
CHECK_USER_URL = reverse('users:check_user')
GET_USER_URL = reverse('users:user_details')
LOGOUT_USER_URL = reverse('users:logout')
CHANGE_PWD_URL = reverse('users:change_pwd')
CHANGE_MAIL_URL = reverse('users:change_mail')
GET_PROFILE_URL = reverse('profiles:get_profile')
EDIT_PROFILE_URL = reverse('profiles:profile_edit')
GET_BLOOD_BANKS_URL = reverse('bb:blood_banks')

# end of constants

whitelisted_domains = [
    '127.0.0.1',
    'ichorbb.herokuapp.com'
]

class UtilityFunctions():
    @staticmethod
    def create_user(**params):
        return get_user_model().objects.create_user(**params)

    @staticmethod
    def check_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = '127.0.0.1' # check if localhost.
        if ip in whitelisted_domains:
            return False
        return True
