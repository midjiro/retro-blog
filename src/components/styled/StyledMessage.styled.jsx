import styled from "styled-components";

const StyledMessage = styled.article`
  inline-size: max(288px, 37.5%);
  padding: 1.5rem;
  margin: 0 auto;
  text-align: center;
  border: 2px solid var(--black-100);
  background: var(--${({ danger = false }) => (danger ? "red" : "yellow")}-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);

  > i {
    margin-inline: auto;
    margin-block-end: 1rem;
  }

  > h3 {
    font-weight: 700;
  }
`;

export default StyledMessage;
