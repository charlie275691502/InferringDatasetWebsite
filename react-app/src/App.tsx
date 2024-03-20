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
import { Table } from "./components/DatasetTable";
import ActionSubPage from "./components/ActionSubPage";
import FileUpload from "./components/FileUpload";

export interface Data {
  id: number;
  file_name: string;
  table: Table;
}

export const domain = "http://127.0.0.1:9000";

function App() {
  const pageNames = ["Raw Data", "Summary", "Action"];

  let [pageName, setPageName] = useState<string>(pageNames[0]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  let [datasetId, setDatasetId] = useState<number>(-1);
  let [fileName, setFileName] = useState<string>();
  let [rawData, setRawData] = useState<Data | null>(null);
  let [summaryData, setRummaryData] = useState<Data | null>(null);

  let onSelectPage = (index: number) => {
    setPageName(pageNames[index]);
  };

  const uploadFile = (file: File) =>
    PostRequest(
      `${domain}/dataset_handler/datasets/upload/`,
      { raw_file: file },
      (response) => {
        setRawData(response);
        setDatasetId(response.id);
        setFileName(response.file_name);
        GetRequest(
          `${domain}/dataset_handler/datasets/summary/${response.id}/`,
          (response) => setRummaryData(response)
        );
      }
    );

  const selectDropdownElement = (column_id: number, element: string) =>
    PutRequest(
      `${domain}/dataset_handler/datasets/${datasetId}/columns/${column_id}/`,
      { type: element },
      (response) => {
        let column = rawData?.table?.columns?.find(
          (column) => column.id == response.id
        );
        if (column) column.type = response.type;
        forceUpdate();
      }
    );

  return (
    <div>
      {(() => {
        if (datasetId == -1) {
          return <FileUpload onUpload={uploadFile} />;
        } else {
          return <h3>{fileName}</h3>;
        }
      })()}
      <Tabs pageNames={pageNames} onSelectPage={onSelectPage} />
      {(() => {
        switch (pageName) {
          case pageNames[0]:
            return (
              <RawDataSubPage
                data={rawData}
                onDropdownElementSelect={selectDropdownElement}
              />
            );
          case pageNames[1]:
            return <SummarySubPage data={summaryData} />;
          case pageNames[2]:
            return <ActionSubPage datasetId={datasetId} />;
        }
      })()}
    </div>
  );
}

export default App;
