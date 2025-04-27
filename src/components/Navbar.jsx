import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/LogoQuiz.png";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getJwtToken = () => {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        if (cookie.trim().startsWith("jwt=")) {
          return cookie.trim().split("=")[1];
        }
      }
      return null;
    };
    const token = getJwtToken();
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <nav
      className="navbar px-3"
      style={{ backgroundColor: "white", position: "absolute", top: "0" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="navbar-brand d-flex flex-column">
            <span className="fw-bold fs-6">Quizzes</span>
            <span className="fw-bold text-muted fs-6">{user ? user.email : "Loading"}</span>
          </div>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <i className="bi bi-person-circle fs-4"></i>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
