import styled from "styled-components";

const StyledSearchForm = styled.section`
  > h2,
  > p {
    text-align: center;
  }

  form {
    inline-size: max(288px, 45.781%);
    margin: 1rem auto;
    display: flex;
    gap: 1.5rem;

    label {
      flex-grow: 1;
    }
  }
`;

export default StyledSearchForm;
