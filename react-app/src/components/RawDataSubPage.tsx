import { Data } from "../App";
import DatasetTable from "./DatasetTable";

interface Props {
  data: Data | null;
  onDropdownElementSelect: (column_id: number, element: string) => void;
}

const RawDataSubPage = ({ data, onDropdownElementSelect }: Props) => {
  return (
    <div>
      {data && (
        <DatasetTable
          table={data.table}
          showDropdown={true}
          onDropdownElementSelect={onDropdownElementSelect}
        />
      )}
    </div>
  );
};

export default RawDataSubPage;
