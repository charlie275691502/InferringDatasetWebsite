import React from "react";

interface Column {
  index: Number;
  name: String;
  type: String;
}

interface Data {
  id: Number;
  file_name: String;
  columns: [Column];
  datas: [[object]];
}

interface Props {
  data: Data;
}

const DatasetTable = ({ data }: Props) => {
  return (
    <>
      <h1>{data.file_name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" key="-">
              #
            </th>
            {data.columns.map((column, index) => (
              <th scope="col" key={index}>
                {column.name}
              </th>
            ))}
          </tr>
          <tr key="1">
            <th scope="col" key="-">
              #
            </th>
            {data.columns.map((column, index) => (
              <th scope="col" key={index}>
                {column.type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
