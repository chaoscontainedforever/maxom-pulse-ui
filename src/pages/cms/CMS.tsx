
import { Routes, Route, Navigate } from "react-router-dom";
import CMSLayout from "./CMSLayout";
import CMSDashboard from "./Dashboard";
import CMSLoginPage from "./Login";
import CMSPages from "./Pages";
import PageEditor from "./PageEditor";

// This component will handle all CMS routes
export default function CMS() {
  return (
    <Routes>
      <Route path="login" element={<CMSLoginPage />} />
      <Route path="/*" element={
        <CMSLayout>
          <Routes>
            <Route path="/" element={<CMSDashboard />} />
            <Route path="/pages" element={<CMSPages />} />
            <Route path="/pages/edit/:slug" element={<PageEditor />} />
            {/* Catch-all route to redirect to dashboard */}
            <Route path="*" element={<Navigate to="/cms" replace />} />
          </Routes>
        </CMSLayout>
      } />
    </Routes>
  );
}
