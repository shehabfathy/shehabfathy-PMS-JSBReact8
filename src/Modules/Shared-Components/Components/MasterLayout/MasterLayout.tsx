import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function MasterLayout() {
  return (
    <div>
      <NavBar />
      <div className=" d-flex   overflow-hidden vh-100 ">
        <div className=" ">
          <SideBar />
        </div>
        <div className=" w-100   ">
          <div className="container-fluid overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
