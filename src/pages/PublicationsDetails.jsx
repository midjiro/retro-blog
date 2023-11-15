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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectPublication } from "../store/publicationReducer";
import {
  deletePublication,
  fetchPublication,
  likePublication,
} from "../services/publication";

const PublicationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, data] = useSelector(selectPublication);

  useEffect(() => {
    dispatch(fetchPublication(id));
  }, []);

  const handleLike = async () => {
    dispatch(likePublication());
  };

  const handleDelete = async () => {
    dispatch(deletePublication());
    navigate("/", { replace: true });
  };

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
            <p>John Doe</p>
            <a href="">@midjiro</a>
          </PublicationAuthor>
          <ButtonGroup>
            <ButtonSuccess onClick={handleLike}>
              {data.likes === 0 ? "Like" : `Like - ${data.likes}`}
            </ButtonSuccess>
            <ButtonDanger onClick={handleDelete}>Remove</ButtonDanger>
          </ButtonGroup>
        </>
      )}
    </StyledPublicationDetails>
  );
};

export default PublicationDetails;
