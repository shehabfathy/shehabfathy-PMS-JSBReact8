import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Pagination from "@mui/material/Pagination";
import { FormControl, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItemMUI from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // ✅ Re-added for full functionality
import Badge from "react-bootstrap/Badge";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared-Components/Components/Deleted-Confirmation/Deleted-Confirmation";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../Context/AuthContext";
import axiosInstance, {
  taskUrl, // ✅ Using taskUrl for API endpoints
} from "../../../Shared-Components/api/authInstance";

// ✅ Adapted interface for a Task
interface ITask {
  id: string;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
  project: {
    title: string;
  };
  employee: {
    userName: string;
  };
  creationDate: string;
}

export default function Tasks_List() {
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext)!;

  // ✅ State variables adapted for Tasks
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskDetails, setViewTaskDetails] = useState<ITask | null>(null);

  const open = Boolean(anchorEl);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Status badge logic specific to Tasks
  const getStatusBadgeStyle = (status: string) => {
    let backgroundColor;
    switch (status) {
      case "ToDo":
        backgroundColor = "#6c757d";
        break;
      case "InProgress":
        backgroundColor = "#EF9B28";
        break;
      case "Done":
        backgroundColor = "#315951";
        break;
      default:
        backgroundColor = "#333";
    }
    return {
      backgroundColor,
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: 300,
      color: "#fff",
    };
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to first page on page size change
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleView = () => {
    if (selectedTaskId) {
      const taskToView = tasks.find((t) => t.id === selectedTaskId);
      if (taskToView) {
        setViewTaskDetails(taskToView);
        setShowViewModal(true);
      }
    }
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (selectedTaskId) {
      navigate(`/dashboard/task-data/${selectedTaskId}`);
    }
    handleMenuClose();
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseDelete = () => setShowDeleteModal(false);

  // ✅ fetchTasks function following the project list pattern
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint =
        loginData?.userGroup === "Manager"
          ? taskUrl.getAllManager
          : taskUrl.GET_EMPLOYEE_TASKS;

      const res = await axiosInstance.get(
        `${endpoint}?page=${page}&pageSize=${pageSize}`
      );
      setTasks(res.data.data || []);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalRecords(res.data.totalNumberOfRecords);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, loginData]);

  useEffect(() => {
    if (loginData) {
      fetchTasks();
    }
  }, [fetchTasks, loginData]);

  // ✅ handleDelete function following the project list pattern
  const handleDelete = async () => {
    if (!taskToDelete) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`/Task/${taskToDelete}`);
      toast.success("Task deleted successfully!");
      handleCloseDelete();
      fetchTasks(); // Refresh list after delete
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    } finally {
      setLoading(false);
    }
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
          Projects
        </h2>
        {loginData?.userGroup === "Manager" && (
          <button
            style={{
              backgroundColor: "#EF9B28",
              borderColor: "#EF9B28",
              borderRadius: "18px",
              color: "#fff",
              border: "1px solid #EF9B28",
              cursor: "pointer",
              padding: "6px 16px",
              fontWeight: 500,
            }}
            onClick={() => navigate("/dashboard/task-data")}
            className="d-flex align-items-center"
          >
            <span style={{ fontSize: "1.5rem", marginRight: "5px" }}>+</span>
            Add New Task
          </button>
        )}
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
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <ClipLoader color="#315951" size={50} />
            </div>
          ) : (
            <>
              <Table striped hover responsive>
                <thead className="text-center">
                  <tr>
                    <th style={headerStyle}>Title</th>
                    <th style={headerStyle}>Status</th>
                    <th style={headerStyle}>Project</th>
                    <th style={headerStyle}>Assigned To</th>
                    <th style={headerStyle}>Created On</th>
                    {loginData?.userGroup === "Manager" && (
                      <th style={headerStyle}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id}>
                        {/* ✅ CRITICAL: Added data-label for responsive behavior */}
                        <td data-label="Title" style={cellPadding}>
                          {task.title}
                        </td>
                        <td data-label="Status" style={cellPadding}>
                          <Badge bg="" style={getStatusBadgeStyle(task.status)}>
                            {task.status}
                          </Badge>
                        </td>
                        <td data-label="Project" style={cellPadding}>
                          {task.project.title}
                        </td>
                        <td data-label="Assigned To" style={cellPadding}>
                          {task.employee.userName}
                        </td>
                        <td data-label="Created On" style={cellPadding}>
                          {formatDate(task.creationDate)}
                        </td>
                        {loginData?.userGroup === "Manager" && (
                          <td data-label="Actions" style={cellPadding}>
                            <IconButton
                              onClick={(e) => handleMenuOpen(e, task.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        style={cellPadding}
                        colSpan={loginData?.userGroup === "Manager" ? 6 : 5}
                      >
                        No tasks found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItemMUI onClick={handleView}>
                  <VisibilityIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                  View
                </MenuItemMUI>
                <MenuItemMUI onClick={handleUpdate}>
                  <EditIcon fontSize="small" style={{ marginRight: 8 }} /> Edit
                </MenuItemMUI>
                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    if (selectedTaskId) {
                      setTaskToDelete(selectedTaskId);
                      setShowDeleteModal(true);
                    }
                  }}
                  sx={{ color: "error.main" }}
                >
                  <DeleteIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                  Delete
                </MenuItemMUI>
              </Menu>

              {/* Pagination Section (Identical structure) */}
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
                      {[...Array(10)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1}
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
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem="task" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewTaskDetails ? (
            <div>
              <h5>{viewTaskDetails.title}</h5>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  bg=""
                  style={getStatusBadgeStyle(viewTaskDetails.status)}
                >
                  {viewTaskDetails.status}
                </Badge>
              </p>
              <p>
                <strong>Project:</strong> {viewTaskDetails.project.title}
              </p>
              <p>
                <strong>Assigned To:</strong>{" "}
                {viewTaskDetails.employee.userName}
              </p>
              <p>
                <strong>Description:</strong> {viewTaskDetails.description}
              </p>
              <p>
                <strong>Created On:</strong>{" "}
                {formatDate(viewTaskDetails.creationDate)}
              </p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
