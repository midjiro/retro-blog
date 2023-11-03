import Publication from "./Publication";
import StyledPublicationList from "./styled/StyledPublicationList.styled";

const PublicationList = ({ publications }) => {
  return (
    <StyledPublicationList>
      {publications.map((publication, index) => (
        <Publication {...publication} key={index} />
      ))}
    </StyledPublicationList>
  );
};

export default PublicationList;
