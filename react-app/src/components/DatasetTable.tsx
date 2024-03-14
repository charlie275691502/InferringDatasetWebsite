import React, { useState } from "react";

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
  let [selectedIndex, setSelectedIndex] = useState<Number>(-1);
  let [selectedType, setSelectedType] = useState("");

  const types = ["Integer", "Float", "Boolean", "Datetime", "Category", "Text"];
  let dropdown = (
    type: String,
    isShowing: Boolean,
    onDropdownClick: () => void
  ) => {
    const menuClass = isShowing ? "dropdown-menu show" : "dropdown-menu";
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={onDropdownClick}
        >
          {type}
        </button>
        <ul className={menuClass}>
          {types.map((t, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  console.log("Hi");
                }}
              >
                {t}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  let onDropdownClick = (index: Number) => {
    if (selectedIndex == index) setSelectedIndex(-1);
    else setSelectedIndex(index);
  };

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
                {dropdown(column.type, selectedIndex == index, () =>
                  onDropdownClick(index)
                )}
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
