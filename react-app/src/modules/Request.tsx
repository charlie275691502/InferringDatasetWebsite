import axios from "axios";

function GetFormData(body: { [x: string]: string | Blob }) {
  const formData = new FormData();
  for (var key in body) {
    formData.append(key, body[key]);
  }
  return formData;
}

export function GetRequest(url: string, onReceive: (response: any) => void) {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      onReceive(response.data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

export function PostRequest(
  url: string,
  body: { [x: string]: string | Blob },
  onReceive: (response: any) => void
) {
  axios
    .post(url, GetFormData(body))
    .then((response) => {
      onReceive(response.data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

export function PutRequest(
  url: string,
  body: { [x: string]: string | Blob },
  onReceive: (response: any) => void
) {
  axios
    .put(url, GetFormData(body))
    .then((response) => {
      onReceive(response.data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
