from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DatasetViewSet, DatasetDownloadViewSet

router = DefaultRouter()
router.register('datasets/preview', DatasetViewSet, basename = 'dataset')
router.register('datasets/download', DatasetDownloadViewSet, basename = 'dataset')

urlpatterns = [
    path('', include(router.urls)),
]