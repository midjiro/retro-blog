const SearchForm = ({ publications, handleSearch }) => {
  return (
    <section className="search">
      <h2>
        Unlock Valuable Insights: Find What You're Looking For in Our Blog{" "}
      </h2>
      <p>
        Search for answers, solutions, and inspiration within our comprehensive
        blog database.
      </p>
      <form
        className="search__form"
        action=""
        onSubmit={(e) => {
          handleSearch(e, publications);
        }}
      >
        <div className="form-control">
          <label htmlFor="search" className="sr-only">
            Search for a publication by its title
          </label>
          <input
            type="search"
            name="title"
            id="search"
            className="form-control__input"
            maxLength="120"
          />
        </div>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
