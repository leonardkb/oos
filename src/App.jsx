import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Production from "./pages/Production";

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/production" element={<Production />} />
      </Routes>
    </Router>
  )
}

export default App
