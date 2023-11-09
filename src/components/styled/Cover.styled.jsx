import styled from "styled-components";

const Cover = styled.img`
  display: block;
  inline-size: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  margin-block-end: 2rem;
  border: 2px solid var(--black-100);
  box-shadow: 8px 8px rgba(0, 0, 0, 0.65);
`;

export default Cover;
