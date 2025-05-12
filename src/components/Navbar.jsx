import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/LogoQuiz.png";
import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user");
        setUser(response.data);
        setRole(response.data.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setIsLoggedIn(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setRole(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="navbar px-3" style={{ backgroundColor: "white", position: "relative", top: "0" }}>
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Link to="/profilescreen">
            <img src={Logo} alt="Logo" className="img-fluid me-2" style={{ width: "40px", height: "40px" }} />
          </Link>

          <div className="navbar-brand d-flex flex-column">
            <span className="fw-bold fs-6">Quizzes</span>
            <Link to="/profilescreen" style={{ textDecoration: "none" }}>
              <span className="fw-bold text-muted fs-6">{user ? user.username : "Loading"}</span>
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center ms-auto gap-3">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/profilescreen" state={{ user }}>Profile</Link>

          {role === "TEACHER" && (
            <>
              <Link className="nav-link" to="/create">Create Quiz</Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link className="nav-link" to="/">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          ) : (
            <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
