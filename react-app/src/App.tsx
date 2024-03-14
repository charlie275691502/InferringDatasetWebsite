import Button from "./components/Button";
import axios from "axios";
import DatasetTable from "./components/DatasetTable";
import { Data } from "./components/DatasetTable";
import { useReducer, useState } from "react";
import FileUpload from "./components/FileUpload";
import { GetRequest, PostRequest, PutRequest } from "./modules/Request";

function App() {
  const domain = "http://127.0.0.1:9000";
  let [data, setData] = useState<Data | null>(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getPreviewDatasets = (dataset_id: number) =>
    GetRequest(
      `${domain}/dataset_handler/datasets/${dataset_id}/`,
      (response) => setData(response)
    );

  const csvUpload = (file: File) =>
    PostRequest(
      `${domain}/dataset_handler/datasets/upload/`,
      { csv: file },
      (response) => setData(response)
    );

  const onDropdownElementSelect = (
    dataset_id: number,
    column_id: number,
    element: string
  ) =>
    PutRequest(
      `${domain}/dataset_handler/datasets/${dataset_id}/columns/${column_id}/`,
      { type: element },
      (response) => {
        let column = data?.columns?.find((column) => column.id == response.id);
        if (column) column.type = response.type;
        forceUpdate();
      }
    );

  return (
    <div>
      <FileUpload onUpload={csvUpload} />
      {/* <Button text="Download" onClickButton={request} /> */}
      <Button text="Cheating" onClickButton={() => getPreviewDatasets(22)} />
      {data && (
        <DatasetTable
          data={data}
          onDropdownElementSelect={onDropdownElementSelect}
        />
      )}
    </div>
  );
}

export default App;
