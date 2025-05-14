import { Routes, Route } from "react-router-dom";
import CMSLayout from "./CMSLayout";
import CMSDashboard from "./Dashboard";
import CMSLoginPage from "./Login";

// This component will handle all CMS routes
export default function CMS() {
  return (
    <Routes>
      <Route path="login" element={<CMSLoginPage />} />
      <Route path="/*" element={
        <CMSLayout>
          <Routes>
            <Route path="/" element={<CMSDashboard />} />
            {/* Other CMS routes will be added here */}
          </Routes>
        </CMSLayout>
      } />
    </Routes>
  );
}
