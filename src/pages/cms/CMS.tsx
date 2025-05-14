
// Update the existing CMS.tsx file to include our new routes

import { Routes, Route, Navigate } from "react-router-dom";
import CMSLayout from "./CMSLayout";
import CMSDashboard from "./Dashboard";
import CMSLoginPage from "./Login";
import CMSPages from "./Pages";
import CMSMedia from "./Media";
import PageEditor from "./PageEditor";

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
            <Route path="/media" element={<CMSMedia />} />
            {/* Future routes will go here */}
            <Route path="/navigation" element={<ComingSoon title="Navigation Editor" />} />
            <Route path="/ribbon" element={<ComingSoon title="Announcement Ribbon" />} />
            <Route path="/settings" element={<ComingSoon title="Site Settings" />} />
            {/* Catch-all route to redirect to dashboard */}
            <Route path="*" element={<Navigate to="/cms" replace />} />
          </Routes>
        </CMSLayout>
      } />
    </Routes>
  );
}

// Temporary component for routes not yet implemented
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground">This feature is coming soon!</p>
    </div>
  );
}
