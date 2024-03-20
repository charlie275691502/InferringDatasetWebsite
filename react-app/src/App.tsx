import Tabs from "./components/Tabs";
import RawDataSubPage from "./components/RawDataSubPage";
import SummarySubPage from "./components/SummarySubPage";
import { useState } from "react";

function App() {
  const pageNames = ["Raw Data", "Summary"];
  let [pageName, setPageName] = useState<string>();
  let onSelectPage = (index: number) => {
    setPageName(pageNames[index]);
  };

  return (
    <div>
      <Tabs pageNames={pageNames} onSelectPage={onSelectPage} />
      {pageName == pageNames[0] ? <RawDataSubPage /> : <SummarySubPage />}
    </div>
  );
}

export default App;
