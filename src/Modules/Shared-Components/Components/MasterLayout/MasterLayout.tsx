import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function MasterLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <NavBar />
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Add responsive classes here */}
        <div className="d-none d-lg-block">
          <SideBar />
        </div>
        <div className="w-100 container-fluid overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
