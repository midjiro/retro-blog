import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: var(--yellow-100);
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  text-transform: capitalize;
  transition: box-shadow 250ms;
  cursor: pointer;

  &:hover,
  &:focus,
  &:disabled {
    box-shadow: none;
  }

  &:disabled {
    background: var(--gray-100);
    color: var(--black-100);
  }
`;

const ButtonDanger = styled(Button)`
  background: var(--red-100);
`;

const ButtonSuccess = styled(Button)`
  background: var(--green-100);
`;

export { Button, ButtonSuccess, ButtonDanger };
