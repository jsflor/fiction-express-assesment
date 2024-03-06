from django.urls import path, include
from rest_framework import routers
from accounts.views import UserViewSet, CSRFTokenViewSet

router = routers.DefaultRouter()

# router.register(r'accounts', UserViewSet)
router.register(r'csrf-token', CSRFTokenViewSet, basename='csrf-token')

urlpatterns = router.urls