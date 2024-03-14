import React, { useState } from "react";

interface Props {
  elements: string[];
  selectedElement: string;
  onElementSelect: (element: string) => void;
}

const Dropdown = ({ elements, selectedElement, onElementSelect }: Props) => {
  let [isListShow, setIsListShow] = useState(false);

  const menuClass = isListShow ? "dropdown-menu show" : "dropdown-menu";
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setIsListShow(!isListShow)}
      >
        {selectedElement}
      </button>
      <ul className={menuClass}>
        {elements.map((element, index) => (
          <li key={index}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                onElementSelect(element);
                setIsListShow(false);
              }}
            >
              {element}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
