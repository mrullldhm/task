import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

/// Manages application theme state (light/dark mode).
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  // Update DOM and persist theme preference whenever selection changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
