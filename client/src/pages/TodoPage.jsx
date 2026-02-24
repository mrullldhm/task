import { useState, useEffect } from "react";
import { Container, Button, Spinner, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const TodoPage = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API and update local state
  const fetchTasks = async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate completion progress percentage
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div
      style={{
        backgroundColor: "var(--bg-main)",
        minHeight: "100vh",
        color: "var(--text-main)",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <NavbarComponent />

      <Container className="py-5 flex-grow-1">
        <Row className="g-4">
          <Col lg={4}>
            <div style={{ position: "sticky", top: "2rem" }}>
              <div
                className="mb-4 p-4"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "16px",
                }}
              >
                <h5 className="fw-bold mb-1">Hello,</h5>
                <p
                  style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}
                  className="mb-4"
                >
                  {user?.email}
                </p>

                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: "var(--text-dim)" }}>
                    Task Progress
                  </small>
                  <small className="fw-bold" style={{ color: "#3b82f6" }}>
                    {progress}%
                  </small>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "var(--border-color)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#3b82f6",
                      transition: "width 0.5s ease-in-out",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100 mt-4"
                  onClick={logout}
                >
                  Logout Account
                </Button>
              </div>
              <TodoForm onTaskAdded={(silent) => fetchTasks(silent)} />
            </div>
          </Col>

          <Col lg={8}>
            <div className="mb-4">
              <h2 className="fw-bold mb-1">My Workspace</h2>
              <p style={{ color: "var(--text-dim)" }}>
                {tasks.length} tasks recorded
              </p>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : tasks.length === 0 ? (
              <div
                className="text-center py-5"
                style={{
                  color: "var(--text-dim)",
                  border: "2px dashed var(--border-color)",
                  borderRadius: "12px",
                }}
              >
                Your workspace is empty.
              </div>
            ) : (
              <div>
                {tasks.map((task) => (
                  <div key={task.id} style={{ marginBottom: "12px" }}>
                    <TodoItem
                      task={task}
                      onTaskUpdated={() => fetchTasks(false)}
                      onTaskDeleted={() => fetchTasks(false)}
                    />
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default TodoPage;
