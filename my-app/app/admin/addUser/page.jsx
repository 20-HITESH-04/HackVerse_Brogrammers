import Navbar from "@/Components/Admin/Navbar";
import Sidebar from "@/Components/Admin/Sidebar";

const AddUser = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6 mt-16">
          <h2 className="text-2xl font-bold text-green-700">Add New User</h2>
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border rounded-md"
              />
              <button className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700">
                Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
