import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define the type for the context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom Hook to use ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const [theme, setTheme] = useState<"light" | "dark">(storedTheme || (systemPrefersDark ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </ThemeContext.Provider>
  );
};
