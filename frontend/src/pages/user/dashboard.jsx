import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      {/* User specific content */}
    </div>
  );
}
