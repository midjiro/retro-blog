import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import {
  deletePublication,
  fetchPublication,
  likePublication,
} from "../services/publication";
import { useDispatch, useSelector } from "react-redux";
import { selectPublication } from "../store/publicationReducer";
import { AuthContext } from "../components/AuthContext";
import Message from "../components/Message";

const PublicationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, data] = useSelector(selectPublication);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = dispatch(fetchPublication(id));
    return unsubscribe;
  }, [id]);

  if (!isAuthenticated) {
    return (
      <section className="publication-details">
        {!data && !error && (
          <Message
            iconClassList={"fa-solid fa-spinner fa-spin"}
            title={"We are loading publication..."}
            description={"Dear Reader, be patient: it may take a while"}
          />
        )}
        {error && <Message {...error} />}
        {data && !error && (
          <>
            <img
              className="publication-details__cover"
              src={data.cover}
              alt=""
            />
            <article className="publication-details__author">
              <img src={data.author.avatar} alt="" className="avatar" />
              <p className="publication-details__author-username">
                {data.author.username}
              </p>
              <a href={`mailto:${data.author.email}`}>{data.author.email}</a>
            </article>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            {data.likedBy.length > 1 && <p>{data.likedBy.length} Likes</p>}
          </>
        )}
      </section>
    );
  }

  return (
    <section className="publication-details">
      {!data && !error && (
        <Message
          iconClassList={"fa-solid fa-spinner fa-spin"}
          title={"We are loading publication..."}
          description={"Dear Reader, be patient: it may take a while"}
        />
      )}
      {error && <Message {...error} />}
      {data && !error && (
        <>
          <img className="publication-details__cover" src={data.cover} alt="" />
          <article className="publication-details__author">
            <img src={data.author.avatar} alt="" className="avatar" />
            <p className="publication-details__author-username">
              {data.author.username}
            </p>
            <a href={`mailto:${data.author.email}`}>{data.author.email}</a>
          </article>
          <section className="publication-details__content">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </section>
          <section className="btn-group">
            <button
              className="btn btn--success"
              onClick={() => likePublication(data, user.uid)}
            >
              {data.likedBy.includes(user.uid)
                ? "Liked"
                : data.likedBy.length >= 1
                ? `${data.likedBy.length} Like`
                : "Like"}
            </button>
            {data.author.id === user.uid && (
              <button
                className="btn btn--danger"
                onClick={() =>
                  deletePublication(id, data.cover).then(() =>
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

export default PublicationDetails;
