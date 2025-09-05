import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function MasterLayout() {
  return (
    <div>
      <NavBar />
      <div className="row overflow-hidden ">
        <div className="col-md-3 bg-danger">
          <SideBar />
        </div>
        <div className="col-md-9 bg-success overflow-auto  ">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
