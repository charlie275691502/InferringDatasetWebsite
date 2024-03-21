# InferringDatasetWebsite

A Fullstack website that can upload dataset, infer the data type of each column, perform data cleaning and processing, and download processed dataset.

# Installation

## 1. Install Python Dependencies
Open cmd and go to the project root folder, install all the python library dependency.              
If you are using pipenv as me, you can execute the commands.                   
`pipenv install`                
If not, you can find all the dependency in Pipfile.

## 2. Setup Docker Container
run the command below or manually start the redis service in Docker              
`docker run --name my-redis-server -d -p 127.0.0.1:6379:6379 redis`

## 3. Start Celery Workers
run the command below. Celery is used to ayschronizing the data type infer tasks.                            
`celery -A main worker -l info -P solo`

## 4. Setup the Database
If you are using VSCode, you can install the sqllite extensions.                     
If not, you may need to setup your own database on your machine.

## 5. Start Django Server
Go to the `{project_root}/django/` folder, run the command to start server                                    
`python manage.py runserver 9000`

## 6. Run React
Go to the `{project_root}/react-app/` folder, run the command to start react service                                    
`npm run dev`               
Then you can go to your browser and chech                         
`http://localhost:5173/#`

# SPEC
![UML](https://github.com/charlie275691502/InferringDatasetWebsite/assets/18097644/e63a2611-e8a7-4cf1-961b-4728cc9077ef)

finished features
- Upload dataset
- Infering datatype for each column
- Manually change datatype of each column
- Download dataset
  
To be done
- Basic Data Cleaning
- Data Transformation
- Data Exploration

# Data Infering
I search every cell in the column, count the number of each data types, then decide a best type for this column.                           
I also use multi-thread processing to increase the efficiency.                        
In conclusion, it take 17 seconds to infer 50MB dataset on my computer, and 378 seconds for 1 GB one.

# Video Demonstration

https://github.com/charlie275691502/InferringDatasetWebsite/assets/18097644/bdb091d3-4ee3-482c-881f-40f988e367f2

# API Document

The base URL for all API requests is: [http://127.0.0.1:9000](http://127.0.0.1:9000/)

## `PUT /dataset_handler/datasets/upload/`

Uploads the csv / xls file to the server

### Parameters

- `raw_file`: The upload file.

### Response

Returns a JSON object describing a dataset model with the following properties:

- `id`: The id of the dataset object.
- `file_name`: The file_name of the raw file.
- `table`: The display table of the dataset
    - `columns`: An array of columns in the dataset, each with the following properties:
        - `id`: The id of the column object.
        - `index`: The index of the column.
        - `name`: The name of the column.
        - `type`: The data type of the column.
    - `datas`: A 2D array of rows of data in the dataset.

### Example

Request:

```
PUT /datasets/upload/
```

Response:

```json
{
    "id": 187,
    "file_name": "sample_data.csv",
    "table": {
        "columns": [
            {
                "id": 1342,
                "index": 0,
                "name": "Name",
                "type": "Text"
            },
            {
                "id": 1343,
                "index": 1,
                "name": "Birthdate",
                "type": "Datetime"
            },
            {
                "id": 1344,
                "index": 2,
                "name": "Score",
                "type": "Integer"
            },
            {
                "id": 1345,
                "index": 3,
                "name": "Grade",
                "type": "Category"
            },
            {
                "id": 1346,
                "index": 4,
                "name": "Height",
                "type": "Float"
            }
        ],
        "datas": [
            [
                "Alice",
                "1/01/1990",
                "90",
                "A",
                "1.72"
            ],
            [
                "Bob",
                "2/02/1991",
                "75",
                "B",
                "1"
            ],
            [
                "Charlie",
                "2/02/1992",
                "85",
                "A",
                "1.23"
            ],
            [
                "David",
                "4/04/1993",
                "70",
                "B",
                "1.30"
            ],
            [
                "Eve",
                "5/05/1994",
                "Not Available",
                "A",
                "1.22"
            ]
        ]
    }
}

```

## `GET /dataset_handler/datasets/download/{dataset_id}/`

Downloads the csv / xls file from the server

### Parameters

- None

### Response

Returns a JSON object describing a dataset model with the following properties:

- `id`: The id of the dataset object.
- `file_name`: The file_name of the raw file.
- `raw_file`: The download link of the raw file.

### Example

Request:

```
GET /datasets/download/3/
```

Response:

```json
{
    "id": 3,
    "file_name": "sample_data_zqQ7rlL.csv",
    "raw_file": "http://127.0.0.1:9000/media/sample_data_zqQ7rlL.csv"
}

```

## Errors (TBD)

This API uses the following error codes:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## `GET /dataset_handler/datasets/{dataset_id}/`

Shows the processed dataset from the server

### Parameters

- None

### Response

Returns a JSON object describing a dataset model with the following properties:

- `id`: The id of the dataset object.
- `file_name`: The file_name of the raw file.
- `extension`: The extension of the raw file.
- `table`: The display table of the dataset
    - `columns`: An array of columns in the dataset, each with the following properties:
        - `id`: The id of the column object.
        - `index`: The index of the column.
        - `name`: The name of the column.
        - `type`: The data type of the column.
    - `datas`: A 2D array of rows of data in the dataset.

### Example

Request:

```
GET /dataset_handler/datasets/187/
```

Response:

```json
{
    "id": 187,
    "file_name": "sample_data.csv",
    "table": {
        "columns": [
            {
                "id": 1342,
                "index": 0,
                "name": "Name",
                "type": "Text"
            },
            {
                "id": 1343,
                "index": 1,
                "name": "Birthdate",
                "type": "Datetime"
            },
            {
                "id": 1344,
                "index": 2,
                "name": "Score",
                "type": "Integer"
            },
            {
                "id": 1345,
                "index": 3,
                "name": "Grade",
                "type": "Category"
            },
            {
                "id": 1346,
                "index": 4,
                "name": "Height",
                "type": "Float"
            }
        ],
        "datas": [
            [
                "Alice",
                "1/01/1990",
                "90",
                "A",
                "1.72"
            ],
            [
                "Bob",
                "2/02/1991",
                "75",
                "B",
                "1"
            ],
            [
                "Charlie",
                "2/02/1992",
                "85",
                "A",
                "1.23"
            ],
            [
                "David",
                "4/04/1993",
                "70",
                "B",
                "1.30"
            ],
            [
                "Eve",
                "5/05/1994",
                "Not Available",
                "A",
                "1.22"
            ]
        ]
    }
}

```

## `PUT /dataset_handler/datasets/summary/{dataset_id}/ columns/{column_id}/`

Update the data type of the column of the dataset.

### Parameters

- `type`: The new data type of the column.

### Response

Returns a JSON object describing a column model with the following properties:

- `id`: The id of the column object.
- `index`: The index of the column.
- `name`: The name of the column.
- `type`: The updated data type of the column.

### Example

Request:

```
PUT /dataset_handler/datasets/4/columns/64/?type=Text
```

Response:

```json
{
    "id": 64,
    "index": 0,
    "name": "Index",
    "type": "Text"
}

```

## `GET /dataset_handler/datasets/summary/{dataset_id}/`

Shows the summary of the dataset from the server

### Parameters

- None

### Response

Returns a JSON object describing a dataset model with the following properties:

- `id`: The id of the dataset object.
- `file_name`: The file_name of the raw file.
- `extension`: The extension of the raw file.
- `table`: The display summary table of the dataset
    - `rows`: An array of row header to show the statistic of the row.
    - `columns`: An array of columns in the dataset, each with the following properties:
        - `id`: The id of the column object.
        - `index`: The index of the column.
        - `name`: The name of the column.
        - `type`: The data type of the column.
    - `datas`: A 2D array of description of data in the dataset.

### Example

Request:

```
GET /dataset_handler/datasets/summary/187/
```

Response:

```json
{
    "id": 187,
    "file_name": "sample_data.csv",
    "table": {
        "rows": [
            "count",
            "mean",
            "std",
            "min",
            "25%",
            "50%",
            "75%",
            "max"
        ],
        "columns": [
            {
                "id": 1344,
                "index": 2,
                "name": "Score",
                "type": "Integer"
            },
            {
                "id": 1346,
                "index": 4,
                "name": "Height",
                "type": "Float"
            }
        ],
        "datas": [
            [
                5.0
            ],
            [
                1.294
            ],
            [
                0.2634008352302627
            ],
            [
                1.0
            ],
            [
                1.22
            ],
            [
                1.23
            ],
            [
                1.3
            ],
            [
                1.72
            ]
        ]
    }
}

```
