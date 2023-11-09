import { Button } from "./styled/Button.styled";
import Input from "./styled/Input.styled";
import StyledSearchForm from "./styled/StyledSearchForm";

const SearchForm = ({ publications, handleSearch }) => {
  return (
    <StyledSearchForm>
      <h2>
        Unlock Valuable Insights: Find What You're Looking For in Our Blog{" "}
      </h2>
      <p>
        Search for answers, solutions, and inspiration within our comprehensive
        blog database.
      </p>
      <form
        action=""
        onSubmit={(e) => {
          handleSearch(e, publications);
        }}
      >
        <label htmlFor="">
          <span className="sr-only">Search for a publication by its title</span>
          <Input type="text" name="title" maxLength="120" />
        </label>
        <Button type="submit">Search</Button>
      </form>
    </StyledSearchForm>
  );
};

export default SearchForm;
