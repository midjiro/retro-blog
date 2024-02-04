import { useNavigate, useParams } from "react-router-dom";

import { deleteBlog, likeBlog } from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { selectSingleBlog } from "../store/blogsReducer";
import { selectCurrentUser, selectIsAuthenticated } from "../store/userReducer";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(selectSingleBlog(id));
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (!blog)
    return (
      <Message
        iconClassList={"fa-solid fa-triangle-exclamation"}
        title={"Blog not found"}
        description={
          "Unable to find blog you are looking for. Try to relad the page."
        }
      />
    );
  else {
    return (
      <section className="blog-details">
        <img className="blog-details__cover" src={blog.cover} alt="" />
        <article className="blog-details__author">
          <img src={blog.author.avatar} alt="" className="avatar" />
          <p className="blog-details__author-username">
            {blog.author.username}
          </p>
          <a href={`mailto:${blog.author.email}`}>{blog.author.email}</a>
        </article>
        <section className="blog-details__content">
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
        </section>
        <section className="btn-group">
          <button
            className="btn btn--success"
            onClick={() => dispatch(likeBlog(blog.id, user.uid))}
          >
            {blog.likedBy.includes(user.uid)
              ? "Liked"
              : blog.likedBy.length >= 1
              ? `${blog.likedBy.length} Like`
              : "Like"}
          </button>
          {blog.author.id === user?.uid && (
            <button
              className="btn btn--danger"
              onClick={() =>
                dispatch(deleteBlog(blog.id, blog.cover)).then(() =>
                  navigate("/", { replace: true })
                )
              }
            >
              Remove
            </button>
          )}
        </section>
      </section>
    );
  }
};

export default BlogDetails;
