import React, { useContext, useEffect, useState } from "react";
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
import Badge from "react-bootstrap/Badge";
// import axios from "axios"; // Using a generic axios for the example
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared-Components/Components/Deleted-Confirmation/Deleted-Confirmation";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../Context/AuthContext";
import axiosInstance, {
  projectUrl,
} from "../../../Shared-Components/api/authInstance";

// Placeholder for axios instance
// const axiosInstance = axios.create({
//   baseURL: `https://upskilling-egypt.com:3003/api/v1${loginData?.userGroup === "Manager" ? "/Project/manager" : "/Project/employee"}`,
// });

export default function Projects_List() {
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  interface Project {
    id: string;
    title: string;
    description: string;
    creationDate: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProjectDetails, setViewProjectDetails] = useState<Project | null>(
    null
  );

  const open = Boolean(anchorEl);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    projectId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const handleView = () => {
    if (selectedProjectId) {
      const projectToView = projects.find((p) => p.id === selectedProjectId);
      if (projectToView) {
        setViewProjectDetails(projectToView);
        setShowViewModal(true);
      }
    }
    handleMenuClose();
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewProjectDetails(null);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/Project/${projectToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Project deleted successfully!");
      handleCloseDelete();
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication Error: No token found in local storage.");
      toast.error("Authentication Error: No token found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(
        `${
          loginData?.userGroup === "Manager"
            ? projectUrl.AllProjectsManager
            : projectUrl.AllProjectsEmployee
        }?page=${page}&pageSize=${pageSize}`
      );

      setProjects(res.data.data || []);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalRecords(res.data.totalNumberOfRecords);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, pageSize]);

  const headerStyle: React.CSSProperties = {
    backgroundColor: "rgba(49, 89, 81, 0.9)",
    color: "#fff",
    border: "1px solid rgba(0,0,0,0.2)",
    fontWeight: 400,
    padding: "1rem",
  };

  const cellPadding: React.CSSProperties = {
    padding: "1rem",
  };

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
            onClick={() => navigate("/dashboard/project-data")}
            className="d-flex align-items-center"
          >
            <span style={{ fontSize: "1.5rem", marginRight: "5px" }}>+</span>
            Add New Project
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
            <ClipLoader />
          ) : (
            <>
              <Table striped hover responsive>
                <thead className="text-center">
                  <tr>
                    <th style={headerStyle}>Title</th>
                    <th style={headerStyle}>Status</th>
                    <th style={headerStyle}>Created At</th>
                    <th style={headerStyle}>Description</th>
                    {loginData?.userGroup === "Manager" && (
                      <th style={headerStyle}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <tr key={project.id || index}>
                        <td style={cellPadding}>{project.title}</td>
                        <td style={cellPadding}>
                          <Badge
                            bg=""
                            style={{
                              backgroundColor: "#315951E5",
                              padding: "0.5rem 1rem",
                              borderRadius: "20px",
                              fontSize: "0.9rem",
                              fontWeight: 300,
                            }}
                            className="text-white"
                          >
                            Active
                          </Badge>
                        </td>
                        <td style={cellPadding}>
                          {formatDate(project.creationDate)}
                        </td>
                        <td style={cellPadding}>{project.description}</td>
                        {loginData?.userGroup === "Manager" && (
                          <td style={cellPadding}>
                            <IconButton
                              onClick={(e) => handleMenuOpen(e, project.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={cellPadding} colSpan={5}>
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* Dropdown Menu */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItemMUI onClick={handleView}>
                  <VisibilityIcon fontSize="small" style={{ marginRight: 8 }} />
                  View
                </MenuItemMUI>

                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    if (selectedProjectId) {
                      setProjectToDelete(selectedProjectId);
                      setShowDeleteModal(true);
                    }
                  }}
                  sx={{ color: "error.main" }}
                >
                  <DeleteIcon fontSize="small" style={{ marginRight: 8 }} />
                  Delete
                </MenuItemMUI>
              </Menu>

              {/* Pagination */}
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

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem="project" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Details Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewProjectDetails ? (
            <div>
              <h5>{viewProjectDetails.title}</h5>
              <p>
                <strong>Description:</strong> {viewProjectDetails.description}
              </p>
              <p>
                <strong>Created On:</strong>{" "}
                {formatDate(viewProjectDetails.creationDate)}
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
