import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/LogoQuiz.png";
import { use, useEffect, useState } from "react";
import api from "../api"
import { Link } from "react-router-dom";
function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user");
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    const user = fetchUser();
  }, []);


  return (
    <nav
      className="navbar px-3"
      style={{ backgroundColor: "white", position: "relative", top: "0" }}
    >
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Link to="/profilescreen">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid me-2"
              style={{ width: "40px", height: "40px" }}
            />
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
          <Link className="nav-link" to="/">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </div>

        {/* <div className="d-flex align-items-center ms-auto">
          <img
            src={user?.profileImage ? user.profileImage : Logo}
            alt="Logo"
            className="img-fluid me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <i className="bi bi-person-circle fs-4"></i>
        </div> */}
        {/* {user && user.profileImage && (
          <Link to="/profilescreen" className="ms-3">
            <img
              src={user.profileImage}
              alt="User"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover", cursor: "pointer" }}
            />
          </Link>
        )} */}
      </div >
    </nav >
  );
}
export default Navbar;
