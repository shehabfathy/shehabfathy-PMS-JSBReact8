import React from "react";
import deleteGirl from "../../../../assets/Ellipse 18.png";

interface DeleteConfirmationProps {
  deleteItem: string; // 👈 Explicit type
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  deleteItem,
}) => {
  return (
    <div className="text-center">
      <img src={deleteGirl} alt="delete" className="mb-5" />
      <h5>Delete This {deleteItem}?</h5>
      <p>
        Are you sure you want to delete this {deleteItem}? This action cannot be
        undone.
      </p>
    </div>
  );
};

export default DeleteConfirmation;
