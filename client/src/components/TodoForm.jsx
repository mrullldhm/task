import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import api from "../services/api";

/// Form component for creating new tasks.
const TodoForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = {
    card: {
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
      transition: "all 0.3s ease",
    },
    input: {
      backgroundColor: "var(--input-bg)",
      border: "1px solid var(--border-color)",
      color: "var(--text-main)",
      borderRadius: "8px",
      transition: "all 0.2s ease",
    },
    label: {
      color: "var(--text-dim)",
      fontSize: "0.85rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    button: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      border: "none",
      fontWeight: "600",
      borderRadius: "8px",
      padding: "0.7rem",
      transition: "all 0.2s ease",
    },
  };

  // Submit task creation request to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      onTaskAdded(false);
    } catch (error) {
      alert("Failed to add task.");
    }
    setLoading(false);
  };

  return (
    <Card style={styles.card}>
      <style>
        {`
          .custom-input::placeholder { 
            color: var(--text-dim) !important; 
            opacity: 0.6;
          }
          .custom-input:focus {
            border-color: #3b82f6 !important;
            background-color: var(--input-bg) !important;
            color: var(--text-main) !important;
            box-shadow: none !important;
          }
          .add-task-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            filter: brightness(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
          }
          .required-label::after {
            content: " *";
            color: #ef4444;
          }
        `}
      </style>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={styles.label} className="required-label">
            Task Title
          </Form.Label>
          <Form.Control
            required
            className="custom-input shadow-none"
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={styles.label}>Description (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="custom-input shadow-none"
            style={styles.input}
            placeholder="Add some details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          style={styles.button}
          type="submit"
          disabled={loading}
          className="w-100 add-task-btn"
        >
          {loading ? "Adding..." : "Add Task"}
        </Button>
      </Form>
    </Card>
  );
};

export default TodoForm;
