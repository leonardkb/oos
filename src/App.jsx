import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Production from "./pages/Production";
import FinishedWarehouse from "./pages/FinishedWarehouse";
import FabricRelaxation from "./pages/FabricRelaxation";
import CuttingSpreading from "./pages/CuttingSpreading";
import Login from "./pages/Login";

function App() {
 

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/production" element={<Production />} />
        <Route path="/finished-warehouse" element={<FinishedWarehouse />} />
        <Route path="/fabric-relaxation" element={<FabricRelaxation />} />
        <Route path="/cutting-spreading" element={<CuttingSpreading />} />
      </Routes>
    </Router>
  )
}

export default App
