import Button from "./Button";
import { domain } from "../App";
import { FileDownload, GetRequest } from "../modules/Request";

interface Props {
  datasetId: number;
}

const ActionSubPage = ({ datasetId }: Props) => {
  const downloadFile = () =>
    GetRequest(
      `${domain}/dataset_handler/datasets/download/${datasetId}/`,
      (response) => FileDownload(response.raw_file, response.file_name)
    );

  return (
    <>
      <Button text="Download" onClickButton={() => downloadFile()} />
    </>
  );
};

export default ActionSubPage;
