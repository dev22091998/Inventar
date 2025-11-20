import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
         <img src={logo} alt="Logo" style={{ height: "40px", width: "auto" }}  />
        </Link>

        {/* Toggle (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right side menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {!user ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-light fw-semibold px-3" to="/login">
                    Login
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="btn btn-warning fw-semibold px-3" to="/register">
                    Register
                  </Link>
                </li> */}
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-light fw-semibold px-3" to="/admin">
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger fw-semibold px-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
