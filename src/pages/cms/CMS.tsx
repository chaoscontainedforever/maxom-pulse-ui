
import { Routes, Route, Navigate } from "react-router-dom";
import CMSLayout from "./CMSLayout";
import CMSDashboard from "./Dashboard";
import CMSPages from "./Pages";
import CMSMedia from "./Media";
import PageEditor from "./PageEditor";

export default function CMS() {
  // In demo mode, we'll bypass the login screen entirely
  return (
    <Routes>
      {/* Redirect login straight to dashboard in demo mode */}
      <Route path="login" element={<Navigate to="/cms" replace />} />
      
      <Route path="/" element={
        <CMSLayout>
          <CMSDashboard />
        </CMSLayout>
      } />
      <Route path="/pages" element={
        <CMSLayout>
          <CMSPages />
        </CMSLayout>
      } />
      <Route path="/pages/edit/:slug" element={
        <CMSLayout>
          <PageEditor />
        </CMSLayout>
      } />
      <Route path="/media" element={
        <CMSLayout>
          <CMSMedia />
        </CMSLayout>
      } />
      <Route path="/navigation" element={
        <CMSLayout>
          <ComingSoon title="Navigation Editor" />
        </CMSLayout>
      } />
      <Route path="/ribbon" element={
        <CMSLayout>
          <ComingSoon title="Announcement Ribbon" />
        </CMSLayout>
      } />
      <Route path="/settings" element={
        <CMSLayout>
          <ComingSoon title="Site Settings" />
        </CMSLayout>
      } />
      {/* Catch-all route to redirect to dashboard */}
      <Route path="*" element={<Navigate to="/cms" replace />} />
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
