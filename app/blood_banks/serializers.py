from rest_framework.serializers import ModelSerializer

from blood_banks.models import BloodBank

class BloodBankSerializer(ModelSerializer):
    class Meta:
        model = BloodBank
        fields = '__all__'
