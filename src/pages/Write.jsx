import { useNavigate, Link } from "react-router-dom";
import WriteForm from "../components/WriteForm";
import StyledWrite from "../components/styled/StyledWrite.styled";
import { addPublication } from "../services/publication";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    addPublication({
      ...data,
      user: {
        id: user.uid,
        email: user.email,
      },
      cover: data.cover.item(0),
      likes: 0,
    })
      .then(() => navigate("/", { replace: true }))
      .catch((e) => console.error(e));
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
