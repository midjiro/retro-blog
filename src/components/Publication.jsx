import { Link } from "react-router-dom";

const Publication = ({ author, title, id }) => {
  return (
    <article className="publication">
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
        <Link to={`publications/${id}`}>{title}</Link>
      </h3>
    </article>
  );
};

export default Publication;
