import { useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "react-bootstrap/Badge"; // 👈 Import Badge
import axiosInstance from "../../../Shared-Components/api/authInstance";
import { Modal, Button } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared-Components/Components/Deleted-Confirmation/Deleted-Confirmation"; // Adjust path
import { toast } from "react-toastify";

export default function Projects_List() {
  const navigate = useNavigate();

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
  // Use React state for selectedProjectId
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
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

  const handleCreate = () => {
    navigate("/dashboard/recipes-data"); // Adjust route as needed
    handleMenuClose();
  };

  const handleUpdate = () => {
    if (selectedProjectId) {
      navigate(`/dashboard/recipes-data/${selectedProjectId}`);
    }
    handleMenuClose();
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await axiosInstance.delete(`/Project/${projectToDelete}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5Niwicm9sZXMiOlsiTWFuYWdlciIsImNhbkFkZFVzZXIiLCJjYW5VcGRhdGVVc2VyIiwiY2FuRGVsZXRlVXNlciIsImNhbkdldFVzZXJCeUlkIiwiY2FuR2V0Q3VycmVudFVzZXIiLCJjYW5HZXRBbGxVc2VycyIsImNhbkNoYW5nZVBhc3N3b3JkIl0sInVzZXJOYW1lIjoibmFkaWE0MjMiLCJ1c2VyRW1haWwiOiJuYWRpYS5tb2hhbWVkLnRhaGExNjZAZ21haWwuY29tIiwidXNlckdyb3VwIjoiTWFuYWdlciIsImlhdCI6MTc1NzQxODIyNywiZXhwIjoxNzYxMDE4MjI3fQ.AB17TD2QE3wIfqgkD-wRymmCYbyA8obNNxk_NfSnF-6BDpEVHGewcfNkYS1TD7VYIaB3K4Mk_ANVR4uUNBrF3minUAJFMYTvmG6N6JAAITvXq3XqgnObi22fWluRe9ATqDNLmFd2KfktjTRVLhRYBELVXXDBJIdOYTHP1VhqY2hsYzyxEXe7YgI_mfv4Kh8JGpaUYmP40x2BYRLXiydt1s2oVVnelvZEK0xr98MNNFjyLuOJ7sfqVU68ltY3s0O0LbhsFzv8al1WuFC8yOiQr96_Ys2S9W7YqNcIoo-_HJyme-08c3Or1kq3qAkB-39dyVIHXqE8ilDl5lLTtlXp1g",
        },
      });
      toast.success("Project deleted successfully!");
      handleCloseDelete();
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get(
        `/Project/?pageSize=${pageSize}&pageNumber=${page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5Niwicm9sZXMiOlsiTWFuYWdlciIsImNhbkFkZFVzZXIiLCJjYW5VcGRhdGVVc2VyIiwiY2FuRGVsZXRlVXNlciIsImNhbkdldFVzZXJCeUlkIiwiY2FuR2V0Q3VycmVudFVzZXIiLCJjYW5HZXRBbGxVc2VycyIsImNhbkNoYW5nZVBhc3N3b3JkIl0sInVzZXJOYW1lIjoibmFkaWE0MjMiLCJ1c2VyRW1haWwiOiJuYWRpYS5tb2hhbWVkLnRhaGExNjZAZ21haWwuY29tIiwidXNlckdyb3VwIjoiTWFuYWdlciIsImlhdCI6MTc1NzMxMzYyMSwiZXhwIjoxNzYwOTEzNjIxfQ.C-HMYlm5pJc9wgjlDUz7FCJ5wfX8SvmkW5ZXVYllgx6MugDPtojJJiloy2-hUhcrrUQFPovZxr-2bL2I6gZnI_5R11VadE3yMk_XD-wsohQT1J0W2TAH3U_q09aITlsf7DteVCId9t7tMkC-bZgQXK1FpdFcAJYjVS_d8_3Nzm26P9Vsvu3K_LH8gQSW3_4pLWqN2PpZ7RW1OUD4U-QFuW6PeVQdfYw-gfjxbFkR9BGILQTCR29QMuCcXwK1FPknHEDjFHZcPYHREkLxFUOUzAaAAAg6accvNnqz_FcmpVgBHyIG7yC0ayKxzJ8UGbXDNlhKdW1tE4L5k8UYpk-pbg",
          },
        }
      );

      setProjects(res.data.data || []);
      setTotalPages(res.data.totalNumberOfPages);
      setTotalRecords(res.data.totalNumberOfRecords);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, pageSize]);

  const headerStyle = {
    backgroundColor: "rgba(49, 89, 81, 0.9)",
    color: "#fff",
    border: "1px solid rgba(0,0,0,0.2)",
    fontWeight: "400",
    padding: "1rem",
  };

  const cellPadding = {
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
        <button
          style={{
            backgroundColor: "#EF9B28",
            borderColor: "#EF9B28",
            borderRadius: "18px",
            color: "#fff",
            border: "1px solid #EF9B28",
            cursor: "pointer",
            padding: "6px 16px",
            fontWeight: "500",
          }}
          onClick={() => navigate("/dashboard/project-data")}
          className="d-flex align-items-center"
        >
          <span style={{ fontSize: "1.5rem", marginRight: "5px" }}>+</span>
          Add New Project
        </button>
      </div>

      {/* Table Section */}
      <div style={{ padding: "1rem", marginTop: "1rem" }}>
        <div
          className="table-container"
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "1rem",
          }}
        >
          <Table striped hover responsive>
            <thead className="text-center">
              <tr>
                <th style={headerStyle}>Title</th>
                <th style={headerStyle}>Status</th>
                <th style={headerStyle}>Created At</th>
                <th style={headerStyle}>Description</th>
                <th style={headerStyle}>Actions</th>
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
                          fontWeight: "300",
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
                    <td style={cellPadding}>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, project.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </td>
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
            <MenuItemMUI onClick={handleCreate}>
              <VisibilityIcon fontSize="small" style={{ marginRight: 8 }} />
              View
            </MenuItemMUI>

            <MenuItemMUI onClick={handleUpdate}>
              <EditIcon fontSize="small" style={{ marginRight: 8 }} />
              Update
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
              Page <strong>{page}</strong> of <strong>{totalPages}</strong> |
              Showing <strong>{pageSize}</strong> per page | Total Records:{" "}
              <strong>{totalRecords}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 Modal OUTSIDE table-container */}
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
    </div>
  );
}
