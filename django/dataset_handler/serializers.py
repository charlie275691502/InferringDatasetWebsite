from rest_framework import serializers
from .models import Dataset, DatasetColumn
from .infer_data_types import get_names_and_types
import pandas as pd

class DatasetColumnSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = DatasetColumn
        fields = ['column_index', 'name', 'type']

class DatasetSerializer(serializers.ModelSerializer):
    column_types = DatasetColumnSerializer(read_only=True, many=True)
    datas = serializers.SerializerMethodField(read_only=True, method_name='get_data_json')
    csv = serializers.FileField(write_only=True)

    def create(self, validated_data):
        dataset = super().create(validated_data)

        df = pd.read_csv(dataset.csv.path)
        types = get_names_and_types(df)
        for idx, (name, type) in enumerate(types) :
            DatasetColumn.objects.create(column_index=idx, name=name, type=type, dataset_id=dataset.id)
        return dataset
    
    def get_data_json(self, dataset: Dataset):
        df = pd.read_csv(dataset.csv.path)
        return df.values.tolist()

    class Meta:
        model = Dataset
        fields = ['id', 'column_types', 'datas', 'csv']

class DatasetDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['id', 'csv']