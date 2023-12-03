import styled from "styled-components";

const FormControl = styled.div`
  font-size: var(--fs-100);

  &:not(:last-child) {
    margin-block-end: 1rem;
  }

  > label {
    display: block;
    margin-block-end: 0.875rem;
  }
`;

export default FormControl;
