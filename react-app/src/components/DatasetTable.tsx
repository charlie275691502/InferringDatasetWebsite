import React, { useState } from "react";
import Dropdown from "./Dropdown";

export interface Column {
  id: number;
  index: number;
  name: string;
  type: string;
}

export interface Table {
  rows: string[];
  columns: Column[];
  datas: object[][];
}

interface Props {
  table: Table;
  showDropdown: boolean;
  onDropdownElementSelect: (column_id: number, element: string) => void;
}

const DatasetTable = ({
  table,
  showDropdown,
  onDropdownElementSelect,
}: Props) => {
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col" key="-"></th>
            {table.columns.map((column, index) => (
              <th scope="col" key={index}>
                {column.name}
              </th>
            ))}
          </tr>
          <tr key="1">
            <th scope="col" key="-"></th>
            {table.columns.map((column, index) => (
              <th scope="col" key={index}>
                {showDropdown ? (
                  <Dropdown
                    elements={elements}
                    selectedElement={column.type}
                    onElementSelect={(element: string) =>
                      onDropdownElementSelect(column.id, element)
                    }
                  />
                ) : (
                  <p>column.type</p>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {table.datas.map((row, index) => (
            <tr key={index}>
              <th scope="row">
                {table.rows == null || table.rows.length < index
                  ? (index + 1).toString()
                  : table.rows[index]}
              </th>
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
