import { useState } from "react";
import NavigationMenu from "./styled/NavigationMenu.styled";
import StyledHeader from "./styled/StyledHeader.styled";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  window.addEventListener("resize", () =>
    window.innerWidth >= 720 ? setIsExpanded(true) : setIsExpanded(false)
  );

  window.addEventListener("load", () =>
    window.innerWidth >= 720 ? setIsExpanded(true) : null
  );

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
        <NavLink to="/sign-in">Sign In</NavLink>
      </NavigationMenu>
    </StyledHeader>
  );
};

export default Header;
