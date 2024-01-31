import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import { deleteBlog, likeBlog } from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../components/AuthContext";
import Message from "../components/Message";
import { selectSingleBlog } from "../store/blogsReducer";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, blog] = useSelector(selectSingleBlog(id));
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <section className="blog-details">
        {!blog && !error && (
          <Message
            iconClassList={"fa-solid fa-spinner fa-spin"}
            title={"We are loading publication..."}
            description={"Dear Reader, be patient: it may take a while"}
          />
        )}
        {error && <Message {...error} />}
        {blog && !error && (
          <>
            <img className="blog-details__cover" src={blog.cover} alt="" />
            <article className="blog-details__author">
              <img src={blog.author.avatar} alt="" className="avatar" />
              <p className="blog-details__author-username">
                {blog.author.username}
              </p>
              <a href={`mailto:${blog.author.email}`}>{blog.author.email}</a>
            </article>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            {blog.likedBy.length > 1 && <p>{blog.likedBy.length} Likes</p>}
          </>
        )}
      </section>
    );
  }

  return (
    <section className="blog-details">
      {!blog && !error && (
        <Message
          iconClassList={"fa-solid fa-spinner fa-spin"}
          title={"We are loading publication..."}
          description={"Dear Reader, be patient: it may take a while"}
        />
      )}
      {error && <Message {...error} />}
      {blog && !error && (
        <>
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
            {blog.author.id === user.uid && (
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
        </>
      )}
    </section>
  );
};

export default BlogDetails;
