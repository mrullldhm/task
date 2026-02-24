import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodoPage from "./pages/TodoPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
