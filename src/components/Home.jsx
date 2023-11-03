import { useState } from "react";
import PublicationList from "./PublicationList";
import SearchForm from "./SearchForm";
import Message from "./Message";

const Home = ({ publications }) => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (e, publications) => {
    e.preventDefault();
    const titleToSearch = new FormData(e.target).get("title");
    const newSearchResults = publications.filter(({ title }) =>
      title.toLowerCase().includes(titleToSearch.toLowerCase())
    );

    if (newSearchResults.length === 0) setSearchResults(null);

    setSearchResults(newSearchResults);
  };

  if (publications === null || publications.length === 0)
    return (
      <main>
        <Message
          iconClassList={"fa-solid fa-ranking-star"}
          title={"Become first who published an article!"}
          description={"Go to the “write” page and publish something awfull."}
        />
      </main>
    );

  return (
    <main>
      <SearchForm publications={publications} handleSearch={handleSearch} />
      <section>
        <h2 className="sr-only">
          {searchResults === null ? "All publications:" : "Results found:"}
        </h2>
        <PublicationList
          publications={searchResults === null ? publications : searchResults}
        />
      </section>
    </main>
  );
};

export default Home;
