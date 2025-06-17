import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="dashboard">
      <h1>Welcome Admin, {user?.name}</h1>
      {/* Admin specific content */}
    </div>
  );
}
