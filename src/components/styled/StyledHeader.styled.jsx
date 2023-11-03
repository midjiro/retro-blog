import styled from "styled-components";

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5% 5%;
  background: var(--yellow-100);
  border-block-end: 2px solid var(--black-100);

  @media screen and (width >= 720px) {
    > button {
      display: none;
    }
  }
`;

export default StyledHeader;
