import React, { useEffect, useState } from "react";
import axiosInstance, {
  taskUrl,
} from "../../../Shared-Components/api/authInstance";

type TaskStatus = "ToDo" | "InProgress" | "Done";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string[];
}

const EmployeeTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { id: "ToDo", title: "To Do", taskIds: [] },
    { id: "InProgress", title: "In Progress", taskIds: [] },
    { id: "Done", title: "Done", taskIds: [] },
  ]);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(taskUrl.GET_EMPLOYEE_TASKS);
      const apiTasks: Task[] = response.data.data;

      const mappedTasks: Task[] = apiTasks.map((t) => ({
        id: String(t.id),
        title: t.title,
        description: t.description,
        status: t.status as TaskStatus,
      }));
      setTasks(mappedTasks);

      setColumns([
        {
          id: "ToDo",
          title: "To Do",
          taskIds: mappedTasks
            .filter((task) => task.status === "ToDo")
            .map((task) => task.id),
        },
        {
          id: "InProgress",
          title: "In Progress",
          taskIds: mappedTasks
            .filter((task) => task.status === "InProgress")
            .map((task) => task.id),
        },
        {
          id: "Done",
          title: "Done",
          taskIds: mappedTasks
            .filter((task) => task.status === "Done")
            .map((task) => task.id),
        },
      ]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const editTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await axiosInstance.put(taskUrl.EDIT_TASKS_BY_EMPLOYEE(Number(taskId)), {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    if (!draggingTaskId) return;
    editTaskStatus(draggingTaskId, columnId);

    const updatedTasks = tasks.map((task) =>
      task.id === draggingTaskId ? { ...task, status: columnId } : task
    );
    const updatedColumns = columns.map((column) => {
      const filteredTaskIds = column.taskIds.filter(
        (id) => id !== draggingTaskId
      );
      if (column.id === columnId) {
        return { ...column, taskIds: [...filteredTaskIds, draggingTaskId] };
      }
      return { ...column, taskIds: filteredTaskIds };
    });
    setTasks(updatedTasks);
    setColumns(updatedColumns);
    setDraggingTaskId(null);
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <h1 className="display-5 bg-white p-4 text-dark mb-4">Task Board</h1>

      <div className="row g-4 p-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) =>
            column.taskIds.includes(task.id)
          );

          return (
            <div
              key={column.id}
              className="col-12 col-md-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-light">
                  {column.title}
                </div>
                <div
                  className="card-body d-flex flex-column gap-3"
                  style={{
                    backgroundColor: "rgba(49, 89, 81, 0.9)",
                    height: "340px",
                  }}
                >
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="card text-white p-3 shadow-sm cursor-pointer"
                      style={{
                        cursor: "grab",
                        backgroundColor: "rgba(239, 155, 40, 1)",
                      }}
                    >
                      <h6 className="mb-1">{task.title}</h6>
                      {task.description && (
                        <p className="mb-0 small">{task.description}</p>
                      )}
                    </div>
                  ))}
                  {columnTasks.length === 0 && (
                    <div className=" text-center text-light py-3">
                      No tasks in this column
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeTask;
