import { useState } from "react";
import BlogList from "../components/BlogList";
import { useSelector } from "react-redux";
import { filterBlogsByTitle } from "../store/blogsReducer";
import SearchForm from "../components/SearchForm";
import Message from "../components/Message";

const Home = () => {
  const [titleToSearch, setTitleToSearch] = useState();
  const blogs = useSelector(filterBlogsByTitle(titleToSearch));

  const handleSearch = ({ target }) => {
    const searchFormData = new FormData(target);
    const titleToSearch = searchFormData.get("title").toLowerCase();
    setTitleToSearch(titleToSearch);
  };

  if (!blogs) {
    return (
      <Message
        iconClassList={"fa-solid fa-triangle-exclamation"}
        title={"There are nothing published yet"}
        description={'Go to "Write" page and become the first author.'}
      />
    );
  } else {
    return (
      <>
        <SearchForm blogs={blogs} handleSearch={handleSearch} />
        <section>
          <h2 className="sr-only">Blogs:</h2>
          <BlogList blogs={blogs} />
        </section>
      </>
    );
  }
};

export default Home;
