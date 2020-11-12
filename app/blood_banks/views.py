from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from blood_banks.serializers import BloodBankSerializer
from blood_banks.models import BloodBank

class GetBloodBanksApiView(APIView):
    """
    API View to get blood banks
    endpoint: bb/
    params: none
    """
    serializer_class = BloodBankSerializer

    def get(self, request):
        name = self.request.data.get('name', None)
        district = self.request.data.get('district', None)

        if name is None and district is None:
            self.bb = BloodBank.objects.all()

        if name is not None and district is None:
            self.bb = BloodBank.objects.get(name=name)

        if name is None and district is not None:
            self.bb = BloodBank.objects.get(district=district)

        if name is not None and district is not None:
            self.bb = BloodBank.objects.get(name=name, district=district)

        serializer = BloodBankSerializer(self.bb, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
