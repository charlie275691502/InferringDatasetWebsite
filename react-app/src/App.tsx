import Button from "./components/Button";
import DatasetTable from "./components/DatasetTable";
import { Data } from "./components/DatasetTable";
import { useReducer, useState } from "react";
import FileUpload from "./components/FileUpload";
import {
  FileDownload,
  GetRequest,
  PostRequest,
  PutRequest,
} from "./modules/Request";

function App() {
  const domain = "http://127.0.0.1:9000";
  let [data, setData] = useState<Data | null>(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getPreviewDatasets = (dataset_id: number) =>
    GetRequest(
      `${domain}/dataset_handler/datasets/${dataset_id}/`,
      (response) => setData(response)
    );

  const uploadFile = (file: File) =>
    PostRequest(
      `${domain}/dataset_handler/datasets/upload/`,
      { raw_file: file },
      (response) => setData(response)
    );

  const downloadFile = (dataset_id: number) =>
    GetRequest(
      `${domain}/dataset_handler/datasets/download/${dataset_id}/`,
      (response) => FileDownload(response.raw_file, response.file_name)
    );

  const selectDropdownElement = (
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
      <FileUpload onUpload={uploadFile} />
      <Button text="Download" onClickButton={() => downloadFile(4)} />
      <Button text="Cheating" onClickButton={() => getPreviewDatasets(4)} />
      {data && (
        <DatasetTable
          data={data}
          onDropdownElementSelect={selectDropdownElement}
        />
      )}
    </div>
  );
}

export default App;
