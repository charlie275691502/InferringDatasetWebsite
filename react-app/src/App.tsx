import Button from "./components/Button";
import axios from "axios";
import DatasetTable from "./components/DatasetTable";
import { Data } from "./components/DatasetTable";
import { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  let [data, setData] = useState<Data | null>(null);

  const request = () => {
    axios
      .get("http://127.0.0.1:9000/dataset_handler/datasets/22")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const csvUpload = (file: File) => {
    const formData = new FormData();
    formData.append("csv", file, file.name);
    axios
      .post("http://127.0.0.1:9000/dataset_handler/datasets/upload/", formData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  };

  const onDropdownElementSelect = (
    dataset_id: number,
    column_id: number,
    element: string
  ) => {
    const formData = new FormData();
    formData.append("type", element);
    axios
      .put(
        `http://127.0.0.1:9000/dataset_handler/datasets/${dataset_id}/columns/${column_id}/`,
        formData
      )
      .then((response) => {
        let newData = structuredClone(data);
        let columns = data?.columns;
        let column = columns?.find((column) => column.id == response.data.id);
        if (column) column.type = response.data.type;
        if (newData && columns) newData.columns = columns;
        console.log(newData);
        setData(newData);
      });
  };

  return (
    <div>
      <FileUpload onUpload={csvUpload} />
      {/* <Button text="Download" onClickButton={request} /> */}
      <Button text="Cheating" onClickButton={request} />
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
