
import AdminLayout from "@/components/AdminLayout";

const Settings = () => {
  return (
    <AdminLayout>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Settings</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Settings Content</h2>
              <p className="text-gray-500">
                This page contains system and user settings for the admin console.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Settings;
