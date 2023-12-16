import { useNavigate, useParams } from "react-router-dom";
import PublicationAuthor from "../components/styled/PublicationAuthor.styled";
import Avatar from "../components/styled/Avatar.styled";
import {
  ButtonSuccess,
  ButtonDanger,
} from "../components/styled/Button.styled";
import Message from "../components/Message";
import Cover from "../components/styled/Cover.styled";
import StyledPublicationDetails from "../components/styled/StyledPublicationDetails.styled";
import ButtonGroup from "../components/styled/ButtonGroup.styled";
import { useContext, useEffect } from "react";

import {
  deletePublication,
  fetchPublication,
  likePublication,
} from "../services/publication";
import { useDispatch, useSelector } from "react-redux";
import { selectPublication } from "../store/publicationReducer";
import { AuthContext } from "../components/AuthContext";

const PublicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, data] = useSelector(selectPublication);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = dispatch(fetchPublication(id));
    return unsubscribe;
  }, [id]);

  return (
    <StyledPublicationDetails>
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
          <Cover src={data.cover} alt="" />
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <h2>Written By</h2>
          <PublicationAuthor className="author-info">
            <Avatar />
            <p>{data.author?.username}</p>
            <a href={`mailto:${data.author?.email}`}>{data.author?.email}</a>
          </PublicationAuthor>
          {isAuthenticated && (
            <ButtonGroup>
              <ButtonSuccess onClick={() => likePublication(data, user.uid)}>
                {data.likedBy?.includes(user.uid)
                  ? "Liked"
                  : data.likedBy?.length >= 1
                  ? `${data.likedBy?.length} Like`
                  : "Like"}
              </ButtonSuccess>
              {data.author?.id === user.uid && (
                <ButtonDanger
                  onClick={() =>
                    deletePublication(id, data.cover).then(() =>
                      navigate("/", { replace: true })
                    )
                  }
                >
                  Remove
                </ButtonDanger>
              )}
            </ButtonGroup>
          )}
        </>
      )}
    </StyledPublicationDetails>
  );
};

export default PublicationDetails;
