import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function MasterLayout() {
  return (
    <div className="d-flex flex-column vh-100 ">
      <NavBar />
      <div className="d-flex overflow-hidden   ">
        <SideBar />
        <div className="w-100 overflow-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
