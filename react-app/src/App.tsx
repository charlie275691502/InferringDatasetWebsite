import Button from "./components/Button";
import axios from "axios";

function App() {
  const request = () => {
    axios
      .get("http://127.0.0.1:9000/dataset_handler/datasets/preview/15")
      .then((response) => {
        console.log(JSON.parse(response.data.data));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      <Button text="Primary" onClickButton={request} />
    </div>
  );
}

export default App;
