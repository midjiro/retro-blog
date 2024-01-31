import { Link } from "react-router-dom";

const Blog = ({ author, title, id }) => {
  return (
    <article className="blog">
      <article className="profile-card">
        <img
          src={author.avatar}
          alt=""
          className="avatar profile-card__avatar"
        />
        <div className="profile-card__info">
          <p className="profile-card__username">{author.username}</p>
          <a href={`mailto:${author.email}`} className="profile-card__email">
            {author.email}
          </a>
        </div>
      </article>
      <h3>
        <Link to={`blogs/${id}`}>{title}</Link>
      </h3>
    </article>
  );
};

export default Blog;
