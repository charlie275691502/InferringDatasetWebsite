import React from "react";
import DatasetTable from "./DatasetTable";
import { Data } from "../App";

interface Props {
  data: Data | null;
}

const SummarySubPage = ({ data }: Props) => {
  return (
    <div>
      {data && (
        <DatasetTable
          table={data.table}
          showDropdown={false}
          onDropdownElementSelect={(_, __) => {}}
        />
      )}
    </div>
  );
};

export default SummarySubPage;
