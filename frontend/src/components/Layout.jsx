import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
