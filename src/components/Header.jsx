import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import { toast } from "react-toastify";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  window.addEventListener("resize", () =>
    window.innerWidth >= 720 ? setIsExpanded(true) : setIsExpanded(false)
  );

  useEffect(() => {
    if (window.innerWidth >= 720) setIsExpanded(true);
  }, []);

  return (
    <header className="navbar">
      <h1 className="navbar__brand">Retro Blog</h1>
      <button
        className="navbar__trigger"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <i className="fa-xl fa-solid fa-bars"></i>
      </button>
      <nav className="navbar__menu" aria-expanded={isExpanded}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/write"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Write
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Contact Us
        </NavLink>
        {isAuthenticated ? (
          <button
            className="btn btn--danger"
            onClick={() =>
              signOut(auth)
                .then(() =>
                  toast("Signed out successfully. See you next time!")
                )
                .then(() => navigate("/", { replace: true }))
            }
          >
            Sign out
          </button>
        ) : (
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
