import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import {
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItemMUI from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Modal, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axiosInstance, {
  imgUrl,
  userUrl,
} from "../../../Shared-Components/api/authInstance";
import NoData from "../../../Shared-Components/Components/NoData/NoData";
import GirlPhoto from "../../../../assets/header.png"; // Default avatar

// ✅ Define the User interface
interface IUser {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  imagePath?: string;
  isActivated: boolean;
}

export default function UserList() {
  // const navigate = useNavigate();

  // ✅ State management aligned with the TasksList pattern
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState<IUser | null>(null);

  const [showToggleStatusModal, setShowToggleStatusModal] = useState(false);
  const [userToToggle, setUserToToggle] = useState<IUser | null>(null);

  const open = Boolean(anchorEl);

  // ✅ A single, optimized function to fetch users (handles normal view and search)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery ? userUrl.filterUser : userUrl.AllUser;
      const params = {
        pageSize,
        pageNumber: page,
        ...(searchQuery && { userName: searchQuery }),
      };

      const { data } = await axiosInstance.get(endpoint, { params });

      setUsers(data.data || []);
      setTotalPages(data.totalNumberOfPages);
      setTotalRecords(data.totalNumberOfRecords);
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchQuery]);

  // ✅ Debounced search effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1); // Reset to page 1 when searching
      fetchUsers();
    }, 500); // Wait 500ms after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, pageSize]); // Re-fetch when search or page size changes

  // Initial fetch and subsequent page changes
  useEffect(() => {
    fetchUsers();
  }, [page]);

  console.log(users);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleView = async () => {
    if (selectedUserId) {
      // Find user from the list first for instant feedback
      const userFromList = users.find((u) => u.id === selectedUserId);
      if (userFromList) {
        setViewUserDetails(userFromList);
        setShowViewModal(true);
      } else {
        // Fallback to fetch if not in the current list (optional)
        try {
          const { data } = await axiosInstance.get(
            userUrl.ActivateUser(selectedUserId)
          );
          setViewUserDetails(data);
          setShowViewModal(true);
        } catch {
          toast.error("Could not fetch user details.");
        }
      }
    }
    handleMenuClose();
  };

  const handleToggleStatus = (user: IUser) => {
    setUserToToggle(user);
    setShowToggleStatusModal(true);
    handleMenuClose();
  };

  const confirmToggleStatus = async () => {
    if (!userToToggle) return;
    try {
      await axiosInstance.put(userUrl.ActivateUser(userToToggle.id));
      toast.success(
        `User ${
          userToToggle.isActivated ? "blocked" : "activated"
        } successfully!`
      );
      setShowToggleStatusModal(false);
      setUserToToggle(null);
      fetchUsers(); // Refresh the list
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: "rgba(49, 89, 81, 0.9)",
    color: "#fff",
    border: "1px solid rgba(0,0,0,0.2)",
    fontWeight: 400,
    padding: "1rem",
  };

  const cellPadding: React.CSSProperties = { padding: "1rem" };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="d-flex flex-wrap justify-content-between align-items-center px-4"
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "80px",
          position: "sticky",
          top: 0,
          zIndex: 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          className="mb-0 fw-normal"
          style={{ color: "#4F4F4F", fontSize: "2.5rem" }}
        >
          Users
        </h2>
      </div>

      {/* Table Section */}
      <div style={{ padding: "1rem", marginTop: "1rem" }}>
        <div
          className="table-container text-center"
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "1rem",
            position: "relative",
            minHeight: "50vh",
          }}
        >
          {/* Search Input */}
          <div className="my-3 d-flex justify-content-end">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <ClipLoader color="#315951" size={50} />
            </div>
          ) : users.length > 0 ? (
            <>
              <Table striped hover responsive>
                <thead className="text-center">
                  <tr>
                    <th style={headerStyle}>Name</th>
                    <th style={headerStyle}>Photo</th>
                    <th style={headerStyle}>Status</th>
                    <th style={headerStyle}>Phone</th>
                    <th style={headerStyle}>Email</th>
                    <th style={headerStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {users.map((user) => (
                    <tr key={user.id}>
                      {/* ✅ CRITICAL: Added data-label for responsive behavior */}
                      <td data-label="Name" style={cellPadding}>
                        {user.userName}
                      </td>
                      <td data-label="Photo" style={cellPadding}>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          src={
                            user.imagePath
                              ? `${imgUrl}${user.imagePath}`
                              : GirlPhoto
                          }
                          alt="user-img"
                        />
                      </td>
                      <td data-label="Status" style={cellPadding}>
                        <Badge
                          pill
                          bg={user.isActivated ? "success" : "danger"}
                        >
                          {user.isActivated ? "Active" : "Blocked"}
                        </Badge>
                      </td>
                      <td data-label="Phone" style={cellPadding}>
                        {user.phoneNumber}
                      </td>
                      <td data-label="Email" style={cellPadding}>
                        {user.email}
                      </td>
                      <td data-label="Actions" style={cellPadding}>
                        <IconButton onClick={(e) => handleMenuOpen(e, user.id)}>
                          <MoreVertIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItemMUI onClick={handleView}>
                  <VisibilityIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                  View
                </MenuItemMUI>
                <MenuItemMUI
                  onClick={() => {
                    const user = users.find((u) => u.id === selectedUserId);
                    if (user) handleToggleStatus(user);
                  }}
                >
                  {users.find((u) => u.id === selectedUserId)?.isActivated ? (
                    <>
                      <BlockIcon
                        color="error"
                        fontSize="small"
                        style={{ marginRight: 8 }}
                      />{" "}
                      Block
                    </>
                  ) : (
                    <>
                      <CheckCircleOutlineIcon
                        color="success"
                        fontSize="small"
                        style={{ marginRight: 8 }}
                      />{" "}
                      Activate
                    </>
                  )}
                </MenuItemMUI>
              </Menu>

              {/* Pagindiv */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    variant="outlined"
                    shape="rounded"
                  />
                  <FormControl size="small" style={{ minWidth: 100 }}>
                    <Select<number>
                      value={pageSize}
                      onChange={handlePageSizeChange}
                    >
                      {[5, 10, 20].map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>{" "}
                  | Showing <strong>{pageSize}</strong> per page | Total
                  Records: <strong>{totalRecords}</strong>
                </p>
              </div>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        show={showToggleStatusModal}
        onHide={() => setShowToggleStatusModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {userToToggle?.isActivated ? "block" : "activate"} the user{" "}
          <strong>{userToToggle?.userName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowToggleStatusModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant={userToToggle?.isActivated ? "danger" : "success"}
            onClick={confirmToggleStatus}
          >
            Yes, {userToToggle?.isActivated ? "Block" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {viewUserDetails ? (
            <div>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
                src={
                  viewUserDetails.imagePath
                    ? `${imgUrl}${viewUserDetails.imagePath}`
                    : GirlPhoto
                }
                alt="user avatar"
              />
              <h5>{viewUserDetails.userName}</h5>
              <p className="mb-1">
                <strong>Email:</strong> {viewUserDetails.email}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {viewUserDetails.phoneNumber}
              </p>
              <p className="mb-1">
                <strong>Country:</strong> {viewUserDetails.country}
              </p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
