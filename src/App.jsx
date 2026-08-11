import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";

const SESSION_KEY = "uidai-wallet-authenticated";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");

  const handleLogin = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}

export default App;
