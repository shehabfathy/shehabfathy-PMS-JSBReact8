import { useEffect, useState } from "react";
import axiosInstance, {
  taskUrl,
} from "../../../Shared-Components/api/authInstance";

// The column titles remain the same
const columns = ["To Do", "In Progress", "Done"];

interface IUserTaskResponse {
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: IUserTask[];
}

type IUserTask = {
  id: number;
  title: string;
  description: string;
  status: ITaskStatus;
};

type ITaskStatus = "ToDo" | "InProgress" | "Done";

export default function Tasks_List() {
  const [tasks, setTasks] = useState<IUserTask[]>([]);
  const toDo = tasks.filter(({ status }) => status === "ToDo");
  const inProgress = tasks.filter(({ status }) => status === "InProgress");
  const done = tasks.filter(({ status }) => status === "Done");

  console.log(toDo);
  console.log(inProgress);
  console.log(done);
  useEffect(() => {
    // This is the self-invoking async function (IIFE)
    (async () => {
      try {
        const response = await axiosInstance.get<IUserTaskResponse>(
          taskUrl.AllTasksEmployee
        );
        setTasks(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })(); // The final '()' immediately invokes the function

    // It's crucial to add a dependency array.
    // An empty array [] means this effect will only run once when the component mounts.
  }, []);

  return (
    <main style={{ backgroundColor: "#F5F5F5" }}>
      {/* Header section */}
      <div className="bg-white py-4 px-lg-5 px-3">
        <h1 className="h2 fw-medium">Task Board</h1>
      </div>

      {/* Main content area for the columns. 'container-fluid' gives it some padding. */}
      <div className="container-fluid py-5">
        {/* Bootstrap's grid system uses 'row' and 'col' */}
        <div className="row g-2">
          {/* Map over the columns array to render each one */}
          {columns.map((title, index) => (
            // 'col' makes each column take up equal width in the row
            <div key={index} className="col">
              <div className="d-flex flex-column gap-4">
                <h2 className="h5 fw-bold ms-4">{title}</h2>

                {/* Column container */}
                <div
                  className="p-3 rounded-3 d-flex flex-column gap-3"
                  style={{
                    backgroundColor: "rgba(49, 89, 81, 0.9)", // Converted hex #315951E6
                    minHeight: "408px",
                  }}
                >
                  {/* Card element */}
                  <div
                    className="p-3 rounded-3 text-white"
                    style={{ backgroundColor: "#EF9B28" }}
                  >
                    This is a task card.
                  </div>
                  {/* You can add more cards here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
