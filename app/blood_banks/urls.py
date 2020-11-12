from django.urls import path

from blood_banks.views import GetBloodBanksApiView

app_name = 'bb'

urlpatterns = [
    path('', GetBloodBanksApiView.as_view(), name='blood_banks'),
]
