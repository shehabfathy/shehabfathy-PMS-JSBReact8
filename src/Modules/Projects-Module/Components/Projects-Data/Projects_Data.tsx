import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../../../Shared-Components/Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  description: string;
};

export default function Projects_Data() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    // Retrieve the token from local storage.
    const token = localStorage.getItem("token");

    // If there's no token, log an error and stop the process.
    if (!token) {
      console.error("Authentication Error: No token found in local storage.");
      toast.error("Authentication Error: No token found.");
      setLoading(false);
      // Optionally, you could show an error message to the user here.
      return;
    }

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Project",
        data,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            // Include the token in the Authorization header.
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project created:", response.data);
      toast.success("Project created successfully!");
      reset();
      navigate("/dashboard/project-list");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project. Please try again.");
      // You can add more specific error handling here, e.g., show a message to the user.
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
      }
    } finally {
      setLoading(false);
    }
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
      </div>

      {/* Form Container */}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title Field */}
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
                style={{ border: "1px solid #ccc" }}
                placeholder="Enter project title"
                disabled={loading}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            {/* Description Field */}
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
                style={{ border: "1px solid #ccc" }}
                rows={3}
                placeholder="Enter project description"
                disabled={loading}
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

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <Button
                type="secondary"
                disabled={loading}
                to="/dashboard/project-list"
              >
                Cancel
              </Button>
              <Button type="primary" disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
