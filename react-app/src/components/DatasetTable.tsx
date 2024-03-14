import React, { useState } from "react";
import Dropdown from "./Dropdown";

interface Column {
  index: number;
  name: string;
  type: string;
}

interface Data {
  id: number;
  file_name: string;
  columns: Column[];
  datas: object[][];
}

interface Props {
  data: Data;
}

const DatasetTable = ({ data }: Props) => {
  let [selectedType, setSelectedType] = useState("");

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
                    onElementSelect={(element: string) => console.log(element)}
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
