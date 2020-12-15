from rest_framework.permissions import BasePermission, SAFE_METHODS

from core.utils import UtilityFunctions

class IsOwnerOrReadOnly(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    def has_permission(self, request, obj):
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user

class IsSameDomain(BasePermission):
    """
    Object-level permission to only allow requests from same domain.
    """
    def has_permission(self, request, obj):
        return UtilityFunctions.check_client_ip(request)

    def has_object_permission(self, request, view, obj):
        return UtilityFunctions.check_client_ip(request)
