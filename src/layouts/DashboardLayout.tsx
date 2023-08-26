import React from "react";
import SideBar from "../components/SideBar";
import Navbar from "./Navbar";

const DashboardLayout: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900">
      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <SideBar />
      {/* <!-- Content --> */}
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
        {/* <!-- Page Heading --> */}
        <Navbar />
        {/* <!-- End Page Heading --> */}
      </div>
      {/* <!-- End Content --> */}
      This is page content
      {/* <!-- ========== END MAIN CONTENT ========== --> */}
    </div>
  );
};

export default DashboardLayout;
