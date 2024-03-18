import pandas as pd
from .infer_data_types import get_column_type, remove_empty_cell

def infer_data_type_task(df: pd.DataFrame):
    empty_strings = set(["", "?", "none", "nan", "no", "-", "undefined", "not available"])
    tasks = [(col, get_column_type.delay(remove_empty_cell(df[col], empty_strings))) for col in df.columns]
    return [(col, task.get()) for col, task in tasks]