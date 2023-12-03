import styled from "styled-components";

const Input = styled.input`
  inline-size: 100%;
  padding: 0.5rem 1rem;
  background: var(--yellow-100);
  outline: none;
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  color: var(--black-100);

  &[aria-invalid="true"] {
    background: var(--red-100);
  }
`;

const FileInput = styled.div`
  aspect-ratio: 3/1;
  position: relative;
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  background: var(--yellow-100);
  padding: 1rem;

  &[aria-invalid="true"] {
    background: var(--red-100);
  }

  img,
  input[type="file"] {
    inline-size: 100%;
    block-size: 100%;
  }

  input[type="file"] {
    position: absolute;
    inset: 0 auto auto 0;
    opacity: 0;
  }

  img {
    display: block;
    object-fit: cover;
  }
`;

const TextArea = styled.textarea`
  inline-size: 100%;
  padding: 0.5rem 1rem;
  background: var(--yellow-100);
  outline: none;
  border: 2px solid var(--black-100);
  box-shadow: 4px 4px rgba(0, 0, 0, 0.65);
  color: var(--black-100);

  &[aria-invalid="true"] {
    background: var(--red-100);
  }
`;

export { Input, FileInput, TextArea };
