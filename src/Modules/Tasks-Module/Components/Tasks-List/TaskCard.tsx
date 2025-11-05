import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { IUserTask } from "./Tasks_List";

const TaskCard = ({ task }: { task: IUserTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    backgroundColor: "#EF9B28",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 rounded-3 text-white"
    >
      <h6 className="fw-bold">{task.title}</h6>
      <p className="mb-0 small">{task.description}</p>
    </div>
  );
};

export default TaskCard;
