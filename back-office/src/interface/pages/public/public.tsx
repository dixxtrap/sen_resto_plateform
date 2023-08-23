
import { useState } from "react";
import { Header } from "../../components/header";
import { Outlet } from "react-router-dom";
import { Navigation, ShortNav } from "../../components/navigation";

export default function Public() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Static sidebar for desktop */}

        <ShortNav />
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="lg:pl-20 ">
          <div className="px-4 py-10 sm:px-6 lg:px-8 text-center lg:py-6">
            {/* Main area */}
            
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </>
  );
}
