from rest_framework import serializers
from .models import Dataset, DatasetColumnType
import pandas as pd

class DatasetColumnTypeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumnType
        fields = ['column_index', 'type']

class DatasetSerializer(serializers.ModelSerializer):
    column_types = DatasetColumnTypeSerializer(read_only=True, many=True)
    data = serializers.SerializerMethodField(read_only=True, method_name='get_data_json')
    csv = serializers.FileField(write_only=True)

    def create(self, validated_data):
        dataset = super().create(validated_data)
        DatasetColumnType.objects.create(column_index=0, type=DatasetColumnType.TYPE_INT, dataset_id=dataset.id)
        return dataset
    
    def get_data_json(self, dataset: Dataset):
        print(dataset.csv.path)
        df = pd.read_csv(dataset.csv.path)
        return df.to_json()

    class Meta:
        model = Dataset
        fields = ['id', 'column_types', 'data', 'csv']

class DatasetDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['id', 'csv']