import Button from "./components/Button";
import axios from "axios";
import DatasetTable from "./components/DatasetTable";
import { useState } from "react";

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

  return (
    <div>
      <Button text="Primary" onClickButton={request} />
      {data && <DatasetTable data={data} />}
    </div>
  );
}

export default App;
