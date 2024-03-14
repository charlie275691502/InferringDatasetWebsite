from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import DatasetViewSet, DatasetUploadViewSet, DatasetDownloadViewSet, DatasetColumnViewSet

router = routers.DefaultRouter()
router.register('datasets/upload', DatasetUploadViewSet, basename = 'dataset-upload')
router.register('datasets/download', DatasetDownloadViewSet, basename = 'dataset-download')

router.register('datasets', DatasetViewSet)
columns_router = routers.NestedDefaultRouter(router, 'datasets', lookup='dataset')
columns_router.register('columns', DatasetColumnViewSet, basename='dataset-columns')

urlpatterns = router.urls + columns_router.urls