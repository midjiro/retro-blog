import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: var(--yellow-100);
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  transition: box-shadow 250ms;

  &:hover,
  &:focus {
    box-shadow: none;
  }
`;

export default Button;