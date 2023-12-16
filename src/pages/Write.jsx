import { useNavigate } from "react-router-dom";
import WriteForm from "../components/WriteForm";
import StyledWrite from "../components/styled/StyledWrite.styled";
import { addPublication, getAuthorData } from "../services/publication";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const author = await getAuthorData(user.uid);
      await addPublication({
        ...data,
        author,
        cover: data.cover.item(0),
        likedBy: [],
      });
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledWrite>
      <h2>Share Your Insights with Our Audience</h2>
      <p>Ready to contribute? We're excited to hear your unique perspective!</p>
      <WriteForm onSubmit={onSubmit} />
    </StyledWrite>
  );
};

export default Write;
