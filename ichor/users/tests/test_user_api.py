from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from core.utils import UtilityFunctions
from core.utils import CREATE_USER_URL, LOGIN_USER_URL, CHECK_USER_URL, LOGOUT_USER_URL, CHANGE_PWD_URL, CHANGE_MAIL_URL, GET_USER_URL
from users.serializers import UserSerializer

payload = {
    'email': 'testuser@email.com',
    'password': 'testuser@'
}

class UserApiTestCase(TestCase):
    """
    Test Users API
    """
    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        """
        Test creating user
        """
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_201_CREATED)

        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """
        Test user already exists
        """
        UtilityFunctions.create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)

    def test_password_strength(self):
        """
        Test for 
        """
        payload = {
            'email': 'testuser@email.com',
            'password': 'psw'
        }

        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_login_user(self):
        """
        Test if user login
        """
        UtilityFunctions.create_user(**payload)

        res = self.client.post(LOGIN_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_200_OK)

    def test_is_authenticated(self):
        """
        Test 
        """
        UtilityFunctions.create_user(**payload)
        res = self.client.post(LOGIN_USER_URL, payload)

        res = self.client.get(CHECK_USER_URL)
        self.assertTrue(res.data['user'])

        self.client.post(LOGOUT_USER_URL)
        res = self.client.get(CHECK_USER_URL)
        self.assertFalse(res.data['user'])

    def test_get_profile(self):
        """
        Test getting user data
        """

        self.user = UtilityFunctions.create_user(**payload)
        self.client.force_authenticate(self.user)

        res = self.client.get(GET_USER_URL)
        self.assertEqual(res.status_code, HTTP_200_OK)

        serializer = UserSerializer(self.user)
        self.assertEqual(res.data, serializer.data)

    def test_change_password(self):
        """
        Test change password.
        """
        self.user = UtilityFunctions.create_user(**payload)
        self.client.force_authenticate(self.user)

        chnge_pwd_payload = {
            'new_password': 'new_password',
            'old_password': payload['password']
        }

        res = self.client.put(CHANGE_PWD_URL, chnge_pwd_payload)

        res = self.client.post(LOGOUT_USER_URL)

        new_payload = {
            'email': 'testuser@email.com',
            'password': 'new_password'
        }

        res = self.client.post(LOGIN_USER_URL, new_payload)
        self.assertEqual(res.status_code, HTTP_200_OK)

    def test_mail_password(self):
        """
        Test change mail.
        """
        self.user = UtilityFunctions.create_user(**payload)
        self.client.force_authenticate(self.user)

        chnge_mail_payload = {
            'new_email': 'testuser2@email.com',
            'password': payload['password']
        }

        res = self.client.put(CHANGE_MAIL_URL, chnge_mail_payload)

        res = self.client.post(LOGOUT_USER_URL)

        new_payload = {
            'email': 'testuser2@email.com',
            'password': payload['password']
        }

        res = self.client.post(LOGIN_USER_URL, new_payload)
        self.assertEqual(res.status_code, HTTP_200_OK)
