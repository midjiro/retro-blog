import { useEffect, useState } from "react";
import Avatar from "./styled/Avatar.styled";
import PublicationAuthor from "./styled/PublicationAuthor.styled";
import StyledPublication from "./styled/StyledPublication.styled";

const Publication = ({ title }) => {
  const [background, setBackground] = useState(null);

  const pickRandomBackground = () => {
    const backgroundList = ["yellow", "red", "green"];
    const pickedBackground =
      backgroundList[Math.floor(Math.random() * backgroundList.length)];

    setBackground(pickedBackground);
  };

  useEffect(pickRandomBackground, []);

  return (
    <StyledPublication background={background}>
      <PublicationAuthor>
        <Avatar
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww"
          alt=""
        />
        <p>John Doe</p>
        <a href="">@johndoe3006</a>
      </PublicationAuthor>
      <h3>
        <a>{title}</a>
      </h3>
    </StyledPublication>
  );
};

export default Publication;
