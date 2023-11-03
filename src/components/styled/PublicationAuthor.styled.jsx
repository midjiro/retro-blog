import styled from "styled-components";

const PublicationAuthor = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.25rem;

  > img {
    grid-area: 1/1/3/2;
  }

  > p {
    font-family: "Roboto", "Arial", sans-serif;
    font-size: var(--fs-100);
    font-weight: 700;
    margin: 0;
  }

  > a {
    font-size: var(--fs-100);
    color: var(--black-100);
  }
`;

export default PublicationAuthor;
