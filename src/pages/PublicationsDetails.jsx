import { redirect, useParams } from "react-router-dom";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import PublicationAuthor from "../components/styled/PublicationAuthor.styled";
import Avatar from "../components/styled/Avatar.styled";
import {
  ButtonSuccess,
  ButtonDanger,
} from "../components/styled/Button.styled";
import Message from "../components/Message";
import { db } from "../config";
import Cover from "../components/styled/Cover.styled";
import StyledPublicationDetails from "../components/styled/StyledPublicationDetails.styled";
import ButtonGroup from "../components/styled/ButtonGroup.styled";
import useFetch from "../hooks/useFetch";
import { getDownloadURL, ref } from "firebase/storage";
import { useRef } from "react";

const PublicationDetails = () => {
  const { id } = useParams();
  const { error, isPending, data } = useFetch("publications", id);
  const coverRef = useRef();

  const handleLike = async () => {
    const docRef = doc(db, "publications", id);
    await updateDoc(docRef, { likes: data.likes + 1 });
  };

  const handleDelete = async () => {
    const docRef = doc(db, "publications", id);
    await deleteDoc(docRef);
    return redirect("/");
  };

  return (
    <StyledPublicationDetails>
      {isPending && (
        <Message
          iconClassList={"fa-solid fa-spinner fa-spin"}
          title={"We are loading publication..."}
          description={"Dear Reader, be patient: it may take a while"}
        />
      )}
      {!isPending && error && <Message {...error} />}
      {data && !error && (
        <>
          <Cover src={data.cover} alt="" ref={coverRef} />
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
