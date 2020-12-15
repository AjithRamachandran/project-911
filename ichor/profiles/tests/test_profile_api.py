from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from core.utils import CREATE_USER_URL, GET_PROFILE_URL, EDIT_PROFILE_URL
from profiles.serializers import ProfileSerializer
from profiles.models import Profile

payload = {
    'email': 'testuser@email.com',
    'password': 'testuser@'
}

class ProfileApiTestCase(TestCase):
    """
    Test Profile API.
    """
    def setUp(self):
        self.client = APIClient()

    def test_create_profile(self):
        """
        Test user creation endpoint also creates a profile for user.
        """
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_201_CREATED)

        self.user = get_user_model().objects.get(**res.data)
        profile_exists = Profile.objects.filter(user=self.user).exists()
        self.assertTrue(profile_exists)

    def test_get_profile(self):
        """
        Test endpoint getting users own profile.
        """
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_201_CREATED)
        self.user = get_user_model().objects.get(**res.data)
        self.profile = Profile.objects.get(user=self.user)
        self.client.force_authenticate(self.user)

        res = self.client.get(GET_PROFILE_URL)
        serializer = ProfileSerializer(self.profile)

        self.assertEqual(res.status_code, HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_user_profile(self):
        """
        Test endpoint getting profile of other users.
        """
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_201_CREATED)
        self.user = get_user_model().objects.get(**res.data)

        GET_USER_PROFILE_URL = reverse('profiles:user_profile', kwargs={'uid': self.user.id})
        res = self.client.get(GET_USER_PROFILE_URL)
        self.assertEqual(res.status_code, HTTP_200_OK)

        self.profile = Profile.objects.get(user=self.user)
        serializer = ProfileSerializer(self.profile)

        self.assertEqual(res.data, serializer.data)

    def test_profile_edit(self):
        """
        Test profile edit endpoint.
        """
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, HTTP_201_CREATED)
        self.user = get_user_model().objects.get(**res.data)
        self.client.force_authenticate(self.user)

        edit_payload = {
            "name": "TestUser"
        }

        res = self.client.patch(EDIT_PROFILE_URL, edit_payload)
        self.assertEqual(res.status_code, HTTP_200_OK)
