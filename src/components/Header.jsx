import { useState } from "react";
import NavigationMenu from "./styled/NavigationMenu.styled";
import StyledHeader from "./styled/StyledHeader.styled";

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
        <a href="">Home</a>
        <a href="">Write</a>
        <a href="">Contact Us</a>
        <a href="">Sign In</a>
      </NavigationMenu>
    </StyledHeader>
  );
};

export default Header;
