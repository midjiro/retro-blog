import StyledMessage from "./styled/StyledMessage.styled";

const Message = ({ iconClassList, title, description, danger }) => {
  return (
    <StyledMessage danger={danger}>
      <i class={`fa-2x ${iconClassList}`}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </StyledMessage>
  );
};

export default Message;
