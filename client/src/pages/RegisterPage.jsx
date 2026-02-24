import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

/// User registration page with email and password form.
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await register(email, password);
    if (result.success) navigate("/todo");
    else setError(result.message);
    setLoading(false);
  };

  const styles = {
    wrapper: {
      backgroundColor: "var(--bg-main)",
      minHeight: "100vh",
      color: "var(--text-main)",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      transition: "background-color 0.3s ease",
    },
    card: {
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
    },
    input: {
      backgroundColor: "var(--input-bg)",
      border: "1px solid var(--border-color)",
      color: "var(--text-main)",
      borderRadius: "8px",
      padding: "0.75rem",
      paddingRight: "2.5rem",
      transition: "all 0.2s ease",
    },
    label: {
      color: "var(--text-dim)",
      fontSize: "0.85rem",
      marginBottom: "0.4rem",
      fontWeight: "500",
    },
    toggleBtn: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "var(--text-dim)",
      cursor: "pointer",
      padding: "5px",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      transition: "color 0.2s ease",
    },
    button: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      border: "none",
      borderRadius: "8px",
      padding: "0.8rem",
      fontWeight: "600",
      marginTop: "1rem",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
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
          .signup-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            filter: brightness(1.1);
            box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3) !important;
          }
          .toggle-eye:hover {
            color: var(--text-main) !important;
          }
          .login-link:hover {
            color: #3b82f6 !important;
            text-decoration: underline !important;
          }
        `}
      </style>

      <NavbarComponent />

      <Container className="d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card style={styles.card}>
            <Card.Body>
              <h2
                className="text-center fw-bold mb-4"
                style={{ color: "var(--text-main)", letterSpacing: "-0.025em" }}
              >
                Create account
              </h2>

              {error && (
                <Alert
                  variant="danger"
                  className="py-2 small bg-danger text-white border-0"
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start">
                  <Form.Label style={styles.label}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    style={styles.input}
                    className="shadow-none custom-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4 text-start">
                  <Form.Label style={styles.label}>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      style={styles.input}
                      className="shadow-none custom-input"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      style={styles.toggleBtn}
                      className="toggle-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755l.791.792zM1.131 1.131a.5.5 0 0 1 .707 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708zm10.906 10.906l-1.44-1.44a2.503 2.503 0 0 1-3.535-3.536l-1.44-1.442a4 4 0 0 0 5.03 5.03z" />
                          <path d="M7.43 11.034A4.974 4.974 0 0 1 3.168 8.7a13.126 13.126 0 0 1-1.996-2.699c.058-.087.121-.183.195-.288.335-.48.83-1.12 1.465-1.755l.708.709a3.995 3.995 0 0 0-.273 2.374l.654.653z" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </Form.Group>

                <Button
                  disabled={loading}
                  style={styles.button}
                  className="w-100 mb-4 signup-btn"
                  type="submit"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                <div className="text-center small">
                  <span style={{ color: "var(--text-dim)" }}>
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="login-link"
                    style={{
                      color: "#3b82f6",
                      textDecoration: "none",
                      fontWeight: "600",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Log In
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <FooterComponent />
    </div>
  );
};

export default RegisterPage;
