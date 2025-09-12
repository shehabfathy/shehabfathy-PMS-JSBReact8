import { useState, useEffect } from "react";
import axiosInstance, {
  projectUrl,
  userUrl,
} from "../../../Shared-Components/api/authInstance";
import { useForm } from "react-hook-form";
import Button from "../../../Shared-Components/Components/Button/Button";
import { useNavigate, useParams } from "react-router-dom"; // 1. Import useParams
import { toast } from "react-toastify";

// Define the shape of our form data
type FormValues = {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
};

// Define interfaces for the data we'll fetch for dropdowns
interface Project {
  id: number;
  title: string;
}

interface User {
  id: number;
  userName: string;
}

export default function Tasks_Data() {
  // 2. Get the taskId from the URL. It will be undefined in create mode.
  const { taskId } = useParams();
  const navigate = useNavigate();

  // 3. Determine the mode based on whether a taskId exists.
  const isUpdateMode = !!taskId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // 4. Use useEffect to fetch data. This now handles both modes.
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const projectResponse = await axiosInstance.get(
          projectUrl.AllProjectsManager,
          {
            params: { pageSize: 1000 },
          }
        );
        setProjects(projectResponse.data.data);

        const userResponse = await axiosInstance.get(userUrl.AllUser, {
          params: { pageSize: 1000, userGroup: "Employee" },
        });
        setUsers(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Could not load projects or users.");
      }
    };

    const fetchTaskDetails = async () => {
      if (!taskId) return;
      try {
        const response = await axiosInstance.get(`/Task/${taskId}`);
        const task = response.data;
        // Pre-fill the form with existing task data
        reset({
          title: task.title,
          description: task.description,
          employeeId: task.employee?.id,
          projectId: task.project?.id,
        });
      } catch {
        toast.error("Failed to fetch task details.");
        navigate("/dashboard/task-list");
      }
    };

    fetchDropdownData();
    if (isUpdateMode) {
      fetchTaskDetails();
    }
  }, [taskId, isUpdateMode, navigate, reset]);

  // 5. The onSubmit function now handles both POST (create) and PUT (update).
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      if (isUpdateMode) {
        // For updating, the API expects a different payload (no projectId)
        const updatePayload = {
          title: data.title,
          description: data.description,
          employeeId: Number(data.employeeId),
        };
        await axiosInstance.put(`/Task/${taskId}`, updatePayload);
        toast.success("Task updated successfully!");
      } else {
        // For creating, we send the full payload
        const createPayload = {
          ...data,
          employeeId: Number(data.employeeId),
          projectId: Number(data.projectId),
        };
        await axiosInstance.post("/Task", createPayload);
        toast.success("Task created successfully!");
      }
      reset();
      navigate("/dashboard/task-list");
    } catch (error: any) {
      console.error("Error submitting task:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* Header - Dynamically change title */}
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
          {isUpdateMode ? "Edit Task" : "Add New Task"}
        </h2>
      </div>

      {/* Form Container */}
      <div style={{ padding: "1rem", marginTop: "1rem" }}>
        <div
          className="table-container"
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "2rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title, Description fields are the same */}
            <div className="mb-3">
              <label
                htmlFor="title"
                className="form-label"
                style={{ color: "#4F4F4F", fontWeight: 400 }}
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label"
                style={{ color: "#4F4F4F", fontWeight: 400 }}
              >
                Description
              </label>
              <textarea
                id="description"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Project Select Field - Disable it in update mode as per API spec */}
            <div className="mb-3">
              <label
                htmlFor="projectId"
                className="form-label"
                style={{ color: "#4F4F4F", fontWeight: 400 }}
              >
                Project
              </label>
              <select
                id="projectId"
                className={`form-select ${
                  errors.projectId ? "is-invalid" : ""
                }`}
                disabled={isUpdateMode} // You can't change a task's project
                {...register("projectId", {
                  required: "Please select a project",
                })}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <div className="invalid-feedback">
                  {errors.projectId.message}
                </div>
              )}
            </div>

            {/* User (Employee) Select Field */}
            <div className="mb-3">
              <label
                htmlFor="employeeId"
                className="form-label"
                style={{ color: "#4F4F4F", fontWeight: 400 }}
              >
                Assign to User
              </label>
              <select
                id="employeeId"
                className={`form-select ${
                  errors.employeeId ? "is-invalid" : ""
                }`}
                {...register("employeeId", {
                  required: "Please assign a user",
                })}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <div className="invalid-feedback">
                  {errors.employeeId.message}
                </div>
              )}
            </div>

            {/* Buttons - Dynamically change text */}
            <div className="d-flex justify-content-between mt-4">
              <Button type="secondary" to="/dashboard/task-list">
                Cancel
              </Button>
              <Button type="primary" disabled={loading}>
                {loading
                  ? isUpdateMode
                    ? "Saving..."
                    : "Creating..."
                  : isUpdateMode
                  ? "Save Changes"
                  : "Create Task"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
