import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/userReducer";
import { logOut } from "../services/user";

const Header = () => {
  const headerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleResize = () =>
    window.innerWidth >= 720 ? setIsExpanded(true) : setIsExpanded(false);

  const handleOutsideClick = (e) => {
    const { target } = e;

    if (window.innerWidth < 720 && !headerRef.current.contains(target))
      setIsExpanded(false);
  };

  useEffect(() => {
    if (window.innerWidth >= 720) setIsExpanded(true);

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="navbar" ref={headerRef}>
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
          <button className="btn btn--danger" onClick={() => logOut()}>
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
