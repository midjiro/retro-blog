import { useState, useEffect } from "react";
import PublicationList from "../components/PublicationList";
import { useDispatch, useSelector } from "react-redux";
import { selectPublications } from "../store/publicationsReducer";
import { createSelector } from "reselect";
import { fetchPublicationList } from "../services/publicationList";
import SearchForm from "../components/SearchForm";
import Message from "../components/Message";

const Home = () => {
  const [titleToSearch, setTitleToSearch] = useState();
  const [error, publications] = useSelector(
    createSelector(selectPublications, ([error, publications]) => {
      if (!titleToSearch) return [error, publications];
      const filteredPublications = publications.filter((pub) =>
        pub.title.toLowerCase().includes(titleToSearch)
      );

      return [error, filteredPublications];
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const cleanup = dispatch(fetchPublicationList());
    if (cleanup) return cleanup;
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchFormData = new FormData(e.target);
    const titleToSearch = searchFormData.get("title").toLowerCase();
    setTitleToSearch(titleToSearch);
  };

  return (
    <>
      {publications === null && !error && (
        <Message
          iconClassList={"fa-solid fa-triangle-exclamation"}
          title={"There are nothing published yet"}
          description={'Go to "Write" page and become the first author.'}
        />
      )}
      {error && <Message {...error} />}
      {publications?.length > 0 && !error && (
        <>
          <SearchForm publications={publications} handleSearch={handleSearch} />
          <section>
            <h2 className="sr-only">Publications:</h2>
            <PublicationList publications={publications} />
          </section>
        </>
      )}
    </>
  );
};

export default Home;
