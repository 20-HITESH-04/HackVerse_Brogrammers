import Sidebar from "../../Components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-6 mt-16">
          <h2 className="text-2xl font-bold text-green-700">Dashboard Overview</h2>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Total Users</h3>
              <p className="text-gray-600">1,234</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">New Registrations</h3>
              <p className="text-gray-600">45</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Active Sessions</h3>
              <p className="text-gray-600">120</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
