from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from .models import Dataset
from .serializers import DatasetSerializer, DatasetDownloadSerializer

# Create your views here.

class DatasetViewSet(ModelViewSet):
    queryset = Dataset.objects.prefetch_related('column_types').all()
    serializer_class = DatasetSerializer

class DatasetDownloadViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetDownloadSerializer