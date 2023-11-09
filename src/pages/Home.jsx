import { useState } from "react";
import PublicationList from "../components/PublicationList";
import SearchForm from "../components/SearchForm";
import Message from "../components/Message";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { error, isPending, data: publications } = useFetch("publications");
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

  return (
    <main>
      {isPending && (
        <Message
          iconClassList={"fa-solid fa-spinner fa-spin"}
          title={"We are loading publications..."}
          description={"Dear Reader, be patient: it may take a while"}
        />
      )}
      {!isPending && error && <Message {...error} />}
      {publications && !error && (
        <>
          <SearchForm publications={publications} handleSearch={handleSearch} />
          <section>
            <h2 className="sr-only">
              {searchResults === null ? "All publications:" : "Results found:"}
            </h2>
            <PublicationList
              publications={
                searchResults === null ? publications : searchResults
              }
            />
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
