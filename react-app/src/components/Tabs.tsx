import React, { useState } from "react";

interface Props {
  pageNames: string[];
  onSelectPage: (index: number) => void;
}

const Tabs = ({ pageNames, onSelectPage }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ul className="nav nav-tabs">
      {pageNames.map((pageName, index) => (
        <li className="nav-item" key={index}>
          <a
            className={selectedIndex == index ? "nav-link active" : "nav-link"}
            href="#"
            onClick={() => {
              if (selectedIndex != index) {
                setSelectedIndex(index);
                onSelectPage(index);
              }
            }}
          >
            {pageName}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
