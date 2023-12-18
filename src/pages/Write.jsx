import { useNavigate } from "react-router-dom";
import { addPublication } from "../services/publication";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import WriteForm from "../components/WriteForm";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      await addPublication({
        ...data,
        author: {
          avatar: user.photoURL,
          username: user.displayName,
          email: user.email,
          id: user.uid,
        },
        cover: data.cover.item(0),
        likedBy: [],
      });
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="form-container">
      <h2>Share Your Insights with Our Audience</h2>
      <p>Ready to contribute? We're excited to hear your unique perspective!</p>
      <WriteForm onSubmit={onSubmit} />
    </section>
  );
};

export default Write;
