import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Original files use named exports
import { LandingPage } from "./pages/LandingPage";
import { DashboardLayout } from "./components/DashboardLayout";

// New files (generated) use default exports
import DashboardOverview from "./pages/DashboardOverview";
import ComplaintsTable from "./pages/ComplaintsTable";
import MapViewPage from "./pages/MapViewPage";
import AIInsightsPage from "./pages/AIInsightsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/complaints" element={<ComplaintsTable />} />
          <Route path="/map" element={<MapViewPage />} />
          <Route path="/insights" element={<AIInsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
