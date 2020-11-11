from django.urls import re_path
from react_app import views


urlpatterns = [
    re_path(r'^', views.index)
]
