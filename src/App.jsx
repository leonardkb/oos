import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Production from "./pages/Production";
import FinishedWarehouse from "./pages/FinishedWarehouse";
import FabricRelaxation from "./pages/FabricRelaxation";

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/production" element={<Production />} />
        <Route path="/finished-warehouse" element={<FinishedWarehouse />} />
        <Route path="/fabric-relaxation" element={<FabricRelaxation />} />
      </Routes>
    </Router>
  )
}

export default App
