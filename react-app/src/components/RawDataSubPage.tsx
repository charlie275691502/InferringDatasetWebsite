import React, { useReducer, useState } from "react";
import {
  FileDownload,
  GetRequest,
  PostRequest,
  PutRequest,
} from "../modules/Request";
import DatasetTable, { Data } from "./DatasetTable";
import Button from "./Button";
import FileUpload from "./FileUpload";

interface Props {
  data: Data | null;
  onUpload: (file: File) => void;
  onDropdownElementSelect: (
    dataset_id: number,
    column_id: number,
    element: string
  ) => void;
}

const RawDataSubPage = ({ data, onUpload, onDropdownElementSelect }: Props) => {
  return (
    <div>
      <FileUpload onUpload={onUpload} />
      {data && (
        <DatasetTable
          data={data}
          onDropdownElementSelect={onDropdownElementSelect}
        />
      )}
    </div>
  );
};

export default RawDataSubPage;
