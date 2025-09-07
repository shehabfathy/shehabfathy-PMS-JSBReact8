import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { BsListTask } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";

export default function SideBar() {
  const { logOut } = useContext(AuthContext);
  return (
    <div className=" vh-100" style={{ backgroundColor: "#0E382F" }}>
      <Sidebar>
        <Menu>
          <MenuItem
            icon={<FaUsers />}
            component={<Link to={ROUTES.Users.slice(1)} />}
          >
            Users{" "}
          </MenuItem>
          <MenuItem
            icon={<GrProjects />}
            component={<Link to={ROUTES.Projects_List.slice(1)} />}
          >
            Projects
          </MenuItem>
          <MenuItem
            icon={<BsListTask />}
            component={<Link to={ROUTES.Tasks_List.slice(1)} />}
          >
            {" "}
            Tasks{" "}
          </MenuItem>

          <MenuItem icon={<IoLogOutOutline />} onClick={() => logOut()}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
