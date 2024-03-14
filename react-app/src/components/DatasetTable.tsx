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
            <th scope="col">#</th>
            {data.columns.map((column) => (
              <th scope="col">{column.name}</th>
            ))}
          </tr>
          <tr>
            <th scope="col">#</th>
            {data.columns.map((column) => (
              <th scope="col">{column.type}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.datas.map((row, index) => (
            <tr>
              <th scope="row">{(index + 1).toString()}</th>
              {row.map((cell) => (
                <td>{String(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DatasetTable;
