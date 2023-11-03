import styled from "styled-components";

const Avatar = styled.img`
  display: block;
  inline-size: ${({ size = 32 }) => size / 16}rem;
  aspect-ratio: 1;
  object-fit: cover;
  border: 2px solid var(--black-100);
  border-radius: 50%;
`;

export default Avatar;
