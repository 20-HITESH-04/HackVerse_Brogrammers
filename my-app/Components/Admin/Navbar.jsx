const Navbar = () => {
    return (
      <div className="fixed top-0 left-64 right-0 bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-green-700">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Admin</span>
        </div>
      </div>
    );
  };
  
  export default Navbar;  