import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import api from "../services/api";

const TodoItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || "",
  );
  const [loading, setLoading] = useState(false);

  const statusColors = {
    success: "#10b981",
    danger: "#ef4444",
    accent: "#3b82f6",
  };

  const handleToggle = async () => {
    try {
      // Send the required fields to the Update endpoint
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted,
      });
      onTaskUpdated(false);
    } catch (error) {
      console.error("Toggle failed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${task.id}`);
        onTaskDeleted();
      } catch (error) {
        console.error("Delete failed");
      }
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/tasks/${task.id}`, {
        title: editTitle,
        description: editDescription,
        isCompleted: task.isCompleted,
      });
      setShowEditModal(false);
      onTaskUpdated(false);
    } catch (err) {
      alert("Update failed");
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          .todo-card { transition: all 0.3s ease; }
          .todo-card:hover { border-color: var(--text-dim) !important; filter: brightness(1.05); }
          .btn-action-hover { transition: all 0.2s ease !important; }
          .btn-done-hover:hover { background-color: ${statusColors.success} !important; color: white !important; transform: scale(1.05); }
          .btn-edit-hover:hover { color: #60a5fa !important; transform: translateY(-1px); }
          .btn-delete-hover:hover { color: #f87171 !important; transform: translateY(-1px); }

          @media (max-width: 576px) {
            .action-group {
              width: 100%;
              justify-content: space-around !important;
              margin-top: 15px;
              padding-top: 15px;
              border-top: 1px solid var(--border-color);
            }
          }
        `}
      </style>

      <div
        className="todo-card p-3 mb-2 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          opacity: task.isCompleted ? 0.7 : 1,
        }}
      >
        {/* Content Section */}
        <div className="d-flex align-items-center flex-grow-1">
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: task.isCompleted
                  ? "var(--text-dim)"
                  : "var(--text-main)",
                fontWeight: "500",
                fontSize: "1rem",
                textDecoration: task.isCompleted ? "line-through" : "none",
                transition: "color 0.3s ease",
              }}
            >
              {task.title}
            </div>
            {task.description && (
              <small
                style={{
                  color: "var(--text-dim)",
                  display: "block",
                  fontSize: "0.85rem",
                }}
              >
                {task.description}
              </small>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-group d-flex align-items-center gap-3 ms-sm-3">
          <Button
            onClick={handleToggle}
            size="sm"
            style={{
              minWidth: "70px",
              backgroundColor: task.isCompleted
                ? statusColors.success
                : "transparent",
              border: `1px solid ${statusColors.success}`,
              color: task.isCompleted ? "#fff" : statusColors.success,
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "600",
            }}
            className="shadow-none btn-action-hover btn-done-hover"
          >
            {task.isCompleted ? "Undo" : "Done"}
          </Button>

          <Button
            variant="link"
            size="sm"
            className="text-decoration-none p-0 fw-bold btn-action-hover btn-edit-hover"
            style={{ color: statusColors.accent, fontSize: "0.85rem" }}
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </Button>

          <Button
            variant="link"
            size="sm"
            className="text-decoration-none p-0 fw-bold btn-action-hover btn-delete-hover"
            style={{ color: statusColors.danger, fontSize: "0.85rem" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            padding: "1.5rem",
            color: "var(--text-main)",
          }}
        >
          <h5 className="mb-4 fw-bold">Edit Task</h5>
          <Form onSubmit={handleEditSave}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}
              >
                Title
              </Form.Label>
              <Form.Control
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-main)",
                }}
                className="shadow-none"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label
                style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}
              >
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-main)",
                }}
                className="shadow-none"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="secondary"
                style={{ borderRadius: "8px" }}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                style={{
                  background: statusColors.accent,
                  border: "none",
                  borderRadius: "8px",
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;
