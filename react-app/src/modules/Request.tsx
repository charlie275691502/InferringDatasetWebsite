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

export function FileDownload(url: string, fileName: string) {
  axios({
    url: url, //your url
    method: "GET",
    responseType: "blob", // important
  })
    .then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
