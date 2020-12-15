from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from core.utils import GET_BLOOD_BANKS_URL
from core.utils import UtilityFunctions
from blood_banks.serializers import BloodBankSerializer
from blood_banks.models import BloodBank

class TestBloodBanksAPI(TestCase):
    """
    Test BBMS API.
    """

    def setUp(self):
        self.client = APIClient()

    def test_get_blood_banks(self):
        """
        Test endpoint getting blood bank details.
        """
        res = self.client.get(GET_BLOOD_BANKS_URL)

        self.assertEqual(res.status_code, HTTP_200_OK)
