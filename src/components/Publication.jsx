import { Link } from "react-router-dom";

const Publication = ({ author, title, id }) => {
  return (
    <article className="publication">
      <article className="profile">
        <img src={author.avatar} alt="" className="avatar profile__avatar" />
        <p className="profile__username">{author.username}</p>
        <a href={`mailto:${author.email}`} className="profile__email">
          {author.email}
        </a>
      </article>
      <h3>
        <Link to={`publications/${id}`}>{title}</Link>
      </h3>
    </article>
  );
};

export default Publication;
