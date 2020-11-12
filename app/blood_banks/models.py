from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model

class BloodBank(models.Model):
    """
    db model to store the profile details of a user. 
    """
    DISTRICT_CHOICES = (
        ('TVM', 'Thiruvananthapuram'),
        ('KLM', 'Kollam'),
        ('PTM', 'Pathanamthitta'),
        ('ALP', 'Alappuzha'),
        ('KTM', 'Kottayam'),
        ('IDK', 'Idukki'),
        ('EKM', 'Ernakulam'),
        ('TSR', 'Thrissur'),
        ('MLP', 'Malappuram'),
        ('PKD', 'Palakkad'),
        ('MLP', 'Wayanad'),
        ('KZD', 'Kozhikode'),
        ('KNR', 'Kannur'),
        ('KSD', 'Kasargod'),
    )

    landline_regex = RegexValidator(regex=r'^[\d]{3,4}[\-\s]*[\d]{6,7}$')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    name = models.CharField(max_length=200)
    address = models.CharField( max_length=128)
    street = models.CharField(max_length=128, blank=True)
    district = models.CharField(max_length=30, choices=DISTRICT_CHOICES)
    landline = models.CharField(validators=[landline_regex], max_length=15, blank=True, null=True)
    secondary_contact = models.CharField(validators=[phone_regex], max_length=15, blank=True, null=True)
