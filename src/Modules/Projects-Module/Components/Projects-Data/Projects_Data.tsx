import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../../../Shared-Components/Components/Button/Button";

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

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Project",
        data,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Project created:", response.data);
      reset();
    } catch (error) {
      console.error(error);
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
              <Button type="secondary" disabled={loading}>
                Reset
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
