from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog.views import BlogPostViewSet, LoremView

router = DefaultRouter()
router.register(r'blogposts', BlogPostViewSet, basename='blogpost')

urlpatterns = router.urls

urlpatterns += [
    path('lorem/', LoremView.as_view(), name='lorem'),
    # Other paths...
]