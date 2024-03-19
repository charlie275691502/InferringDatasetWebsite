from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from .models import Dataset, DatasetColumn
from .serializers import DatasetSerializer, DatasetDownloadSerializer, DatasetColumnSerializer, DatasetSummarySerializer

# Create your views here.

class DatasetUploadViewSet(CreateModelMixin, GenericViewSet):
    queryset = Dataset.objects.prefetch_related('columns').all()
    serializer_class = DatasetSerializer

class DatasetDownloadViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetDownloadSerializer

class DatasetViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Dataset.objects.prefetch_related('columns').all()
    serializer_class = DatasetSerializer

class DatasetColumnViewSet(UpdateModelMixin, GenericViewSet):
    serializer_class = DatasetColumnSerializer

    def get_queryset(self):
        return DatasetColumn.objects.filter(dataset_id=self.kwargs['dataset_pk']).all()
    
class DatasetSummaryViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Dataset.objects.prefetch_related('columns').all()
    serializer_class = DatasetSummarySerializer