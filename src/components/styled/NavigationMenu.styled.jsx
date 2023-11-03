import styled from "styled-components";

const NavigationMenu = styled.nav`
  position: absolute;
  inset: 100% 0 auto 0;
  background: var(--yellow-100);
  padding: inherit;
  transform-origin: top left;
  transition: scale 250ms;
  border: inherit;
  scale: 1 0;

  &[aria-expanded="true"] {
    scale: 1 1;
  }

  a {
    display: block;
    color: var(--black-100);

    &:not(:last-child) {
      margin-block-end: 1rem;
    }

    &.active,
    &:hover,
    &:focus {
      font-weight: 700;
    }
  }

  @media screen and (width >= 720px) {
    position: static;
    padding: 0;
    border: none;

    a {
      display: inline-block;

      &:not(:last-child) {
        margin-inline-end: 1rem;
        margin-block-end: 0;
      }
    }
  }
`;

export default NavigationMenu;
