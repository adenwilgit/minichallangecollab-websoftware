import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("mini-challenge-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function handleLogin(nextUser) {
    setUser(nextUser);
    localStorage.setItem("mini-challenge-user", JSON.stringify(nextUser));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("mini-challenge-user");
  }

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Dashboard
      user={user}
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((current) => !current)}
      onLogout={handleLogout}
    />
  );
}

export default App;
