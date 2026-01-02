import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Production from "./pages/Production";
import FinishedWarehouse from "./pages/FinishedWarehouse";

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/production" element={<Production />} />
        <Route path="/finished-warehouse" element={<FinishedWarehouse />} />
      </Routes>
    </Router>
  )
}

export default App
