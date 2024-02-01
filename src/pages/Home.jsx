import { useState, useEffect } from "react";
import BlogList from "../components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { filterBlogsByTitle } from "../store/blogsReducer";

import { fetchBlogs } from "../services/blogs";
import SearchForm from "../components/SearchForm";
import Message from "../components/Message";

const Home = () => {
  const [titleToSearch, setTitleToSearch] = useState();
  const [error, blogs] = useSelector(filterBlogsByTitle(titleToSearch));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchFormData = new FormData(e.target);
    const titleToSearch = searchFormData.get("title").toLowerCase();
    setTitleToSearch(titleToSearch);
  };

  return (
    <>
      {!blogs && !error && (
        <Message
          iconClassList={"fa-solid fa-triangle-exclamation"}
          title={"There are nothing published yet"}
          description={'Go to "Write" page and become the first author.'}
        />
      )}
      {error && <Message {...error} />}
      {blogs && !error && (
        <>
          <SearchForm blogs={blogs} handleSearch={handleSearch} />
          <section>
            <h2 className="sr-only">Blogs:</h2>
            <BlogList blogs={blogs} />
          </section>
        </>
      )}
    </>
  );
};

export default Home;
