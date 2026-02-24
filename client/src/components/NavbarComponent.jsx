import { Navbar, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

/// Navigation bar with theme toggle functionality.
const NavbarComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar
      className="px-4 py-3 justify-content-between"
      style={{
        backgroundColor: "var(--bg-main)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <Navbar.Brand
        className="fw-bold"
        style={{
          color: "var(--text-main)",
          letterSpacing: "-0.02em",
          transition: "color 0.3s ease",
        }}
      >
        Task
      </Navbar.Brand>

      <Button
        variant="link"
        onClick={toggleTheme}
        className="text-decoration-none shadow-none"
        style={{
          fontSize: "1.2rem",
          padding: 0,
          transition: "transform 0.2s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </Button>
    </Navbar>
  );
};

export default NavbarComponent;
