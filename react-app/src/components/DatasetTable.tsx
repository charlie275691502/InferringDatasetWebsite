import React, { useState } from "react";
import Dropdown from "./Dropdown";

export interface Column {
  id: number;
  index: number;
  name: string;
  type: string;
}

export interface Data {
  id: number;
  file_name: string;
  columns: Column[];
  datas: object[][];
}

interface Props {
  data: Data;
  onDropdownElementSelect: (
    dataset_id: number,
    column_id: number,
    element: string
  ) => void;
}

const DatasetTable = ({ data, onDropdownElementSelect }: Props) => {
  const elements = [
    "Integer",
    "Float",
    "Boolean",
    "Datetime",
    "Category",
    "Text",
  ];

  return (
    <>
      <h1>{data.file_name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" key="-"></th>
            {data.columns.map((column, index) => (
              <th scope="col" key={index}>
                {column.name}
              </th>
            ))}
          </tr>
          <tr key="1">
            <th scope="col" key="-"></th>
            {data.columns.map((column, index) => (
              <th scope="col" key={index}>
                {
                  <Dropdown
                    elements={elements}
                    selectedElement={column.type}
                    onElementSelect={(element: string) =>
                      onDropdownElementSelect(data.id, column.id, element)
                    }
                  />
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.datas.map((row, index) => (
            <tr key={index}>
              <th scope="row">{(index + 1).toString()}</th>
              {row.map((cell, jndex) => (
                <td key={jndex}>{String(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DatasetTable;
