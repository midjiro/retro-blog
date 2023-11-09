import StyledMessage from "./styled/StyledMessage.styled";

const Message = ({ iconClassList, title, description, danger, children }) => {
  return (
    <StyledMessage danger={danger}>
      <i className={`fa-2x ${iconClassList}`}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </StyledMessage>
  );
};

export default Message;
