import Button from "./components/Button";
import axios from "axios";
import DatasetTable from "./components/DatasetTable";
import { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  let [data, setData] = useState(null);

  const request = () => {
    axios
      .get("http://127.0.0.1:9000/dataset_handler/datasets/preview/22")
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
      .post("http://127.0.0.1:9000/dataset_handler/datasets/preview/", formData)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  };

  return (
    <div>
      <FileUpload onUpload={csvUpload} />
      <Button text="Primary" onClickButton={request} />
      {data && <DatasetTable data={data} />}
    </div>
  );
}

export default App;
