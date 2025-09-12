import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { FaHome, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { BsListTask } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import "./SideBar.modules.css";

export default function SideBar() {
  const { logOut, loginData } = useContext(AuthContext);
  const [iscollapse, setCollapse] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sidebar collapsed={iscollapse} className=" sidebar-custom vh-100  ">
      <div className="sidebar-continer position-relative vh-100">
        {/* Toggle Button */}
        <div className="position-absolute rounded-1 sidebar_icon">
          {iscollapse ? (
            <IoIosArrowDroprightCircle
              onClick={() => setCollapse((prev) => !prev)}
              color="#ef9b28"
              size={30}
            />
          ) : (
            <IoIosArrowDropleftCircle
              onClick={() => setCollapse((prev) => !prev)}
              color="#ef9b28"
              size={30}
            />
          )}
        </div>

        {/* Menu */}
        <Menu className="py-5 px-1">
          <MenuItem
            active={location.pathname === "/dashboard"}
            icon={<FaHome size={20} />}
            component={<Link to={ROUTES.DASHBOARD} />}
          >
            Home
          </MenuItem>
          {loginData?.userGroup == "Manager" && (
            <MenuItem
              active={location.pathname === "/dashboard/user"}
              icon={<FaUsers size={20} />}
              component={<Link to={ROUTES.Users.slice(1)} />}
            >
              Users
            </MenuItem>
          )}
          <MenuItem
            active={location.pathname === "/dashboard/project-list"}
            icon={<GrProjects size={20} />}
            component={<Link to={ROUTES.Projects_List.slice(1)} />}
          >
            Projects
          </MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard/task-list"}
            icon={<BsListTask size={20} />}
            component={<Link to={ROUTES.Tasks_List.slice(1)} />}
          >
            Tasks
          </MenuItem>
          <MenuItem
            icon={<IoLogOutOutline size={20} />}
            onClick={() => logOut()}
          >
            LogOut
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
}
