import { useContext, useEffect, useState } from "react";
import NavigationMenu from "./styled/NavigationMenu.styled";
import StyledHeader from "./styled/StyledHeader.styled";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import { ButtonDanger } from "../components/styled/Button.styled";
import { toast } from "react-toastify";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  window.addEventListener("resize", () =>
    window.innerWidth >= 720 ? setIsExpanded(true) : setIsExpanded(false)
  );

  useEffect(() => {
    if (window.innerWidth >= 720) setIsExpanded(true);
  }, []);

  return (
    <StyledHeader>
      <h1>Retro Blog</h1>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        <i className="fa-xl fa-solid fa-bars"></i>
      </button>
      <NavigationMenu aria-expanded={isExpanded}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/write">Write</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
        {user ? (
          <ButtonDanger
            onClick={() =>
              signOut(auth)
                .then(() =>
                  toast("Signed out successfully. See you next time!")
                )
                .then(() => navigate("/", { replace: true }))
            }
          >
            Sign out
          </ButtonDanger>
        ) : (
          <NavLink to="/sign-in">Sign In</NavLink>
        )}
      </NavigationMenu>
    </StyledHeader>
  );
};

export default Header;
