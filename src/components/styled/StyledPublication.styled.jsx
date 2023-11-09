import styled from "styled-components";

const StyledPublication = styled.article`
  inline-size: max(288px, 21.562%);
  padding: 1.5rem;
  background: var(--${({ background }) => background}-100);
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  transition: box-shadow 250ms;

  &:hover {
    box-shadow: none;
  }

  h3 {
    margin-block-end: 0;
    cursor: pointer;

    a {
      color: inherit;
    }
  }
`;

export default StyledPublication;
