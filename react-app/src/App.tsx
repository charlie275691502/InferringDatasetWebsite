import Tabs from "./components/Tabs";
import RawDataSubPage from "./components/RawDataSubPage";
import SummarySubPage from "./components/SummarySubPage";
import { useReducer, useState } from "react";
import {
  FileDownload,
  GetRequest,
  PostRequest,
  PutRequest,
} from "./modules/Request";
import { Data } from "./components/DatasetTable";
import ActionSubPage from "./components/ActionSubPage";

function App() {
  const domain = "http://127.0.0.1:9000";
  const pageNames = ["Raw Data", "Summary", "Action"];
  let [pageName, setPageName] = useState<string>();
  let onSelectPage = (index: number) => {
    setPageName(pageNames[index]);
  };
  let [data, setData] = useState<Data | null>(null);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const downloadFile = (dataset_id: number) =>
    GetRequest(
      `${domain}/dataset_handler/datasets/download/${dataset_id}/`,
      (response) => FileDownload(response.raw_file, response.file_name)
    );

  const uploadFile = (file: File) =>
    PostRequest(
      `${domain}/dataset_handler/datasets/upload/`,
      { raw_file: file },
      (response) => setData(response)
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
      <Tabs pageNames={pageNames} onSelectPage={onSelectPage} />
      {pageName == pageNames[0] ? (
        <RawDataSubPage
          data={data}
          onUpload={uploadFile}
          onDropdownElementSelect={selectDropdownElement}
        />
      ) : pageName == pageNames[1] ? (
        <SummarySubPage />
      ) : (
        <ActionSubPage />
      )}
    </div>
  );
}

export default App;
