import pathlib
from rest_framework import serializers
from .models import Dataset, DatasetColumn
from .infer_data_types import get_names_and_types
import pandas as pd
import os

class DatasetColumnSerializer(serializers.ModelSerializer):
    index = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumn
        fields = ['id', 'index', 'name', 'type']

    def update(self, instance, validated_data):
        validated_data['type'] = {value: key for key, value in DatasetColumn.TYPE_CHOICES}.get(validated_data['get_type_display'], DatasetColumn.TYPE_INT)
        return super().update(instance, validated_data)


class DatasetSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField(read_only=True, method_name='get_file_name')
    columns = DatasetColumnSerializer(read_only=True, many=True)
    datas = serializers.SerializerMethodField(read_only=True, method_name='get_data')
    raw_file = serializers.FileField(write_only=True)
    extension = serializers.CharField(read_only=True)

    def create(self, validated_data):
        raw_file = validated_data['raw_file']
        extension = pathlib.Path(raw_file.name).suffix[1:]
        if extension != Dataset.EXTENSION_CSV and extension != Dataset.EXTENSION_XLS :
            return
        
        validated_data['extension'] = extension
        dataset = super().create(validated_data)

        if dataset.extension == Dataset.EXTENSION_CSV :
            df = pd.read_csv(dataset.raw_file.path)
        elif dataset.extension == Dataset.EXTENSION_XLS :
            df = pd.read_excel(dataset.raw_file.path)
        
        types = get_names_and_types(df)
        for idx, (name, type) in enumerate(types) :
            DatasetColumn.objects.create(index=idx, name=name, type=type, dataset_id=dataset.id)
        return dataset
    
    def get_file_name(self, dataset: Dataset):
        return os.path.basename(dataset.raw_file.path)
    
    def get_data(self, dataset: Dataset):
        if dataset.extension == Dataset.EXTENSION_CSV :
            df = pd.read_csv(dataset.raw_file.path)
        elif dataset.extension == Dataset.EXTENSION_XLS :
            df = pd.read_excel(dataset.raw_file.path)
        else :
            return
        
        return df.values.tolist()

    class Meta:
        model = Dataset
        fields = ['id', 'file_name', 'extension', 'columns', 'datas', 'raw_file']

class DatasetDownloadSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField(read_only=True, method_name='get_file_name')
    
    def get_file_name(self, dataset: Dataset):
        return os.path.basename(dataset.raw_file.path)
    
    class Meta:
        model = Dataset
        fields = ['id', 'file_name', 'raw_file']