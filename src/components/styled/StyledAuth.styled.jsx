import styled from "styled-components";

const StyledAuth = styled.div`
  inline-size: max(288px, 40%);
  margin-inline: auto;
  display: flex;
  flex-direction: column;

  a {
    margin-block: 0.5rem;
  }

  form {
    inline-size: 100%;

    button {
      inline-size: 100%;
      margin-block: 1.5rem;
    }
  }
`;

export default StyledAuth;
