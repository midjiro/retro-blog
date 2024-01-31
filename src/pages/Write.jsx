import { useNavigate } from "react-router-dom";
import { addBlog } from "../services/blogs";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import WriteForm from "../components/WriteForm";
import { useDispatch } from "react-redux";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(
      addBlog({
        ...data,
        author: {
          avatar: user.photoURL,
          username: user.displayName,
          email: user.email,
          id: user.uid,
        },
        cover: data.cover.item(0),
        likedBy: [],
      })
    );
    navigate("/", { replace: true });
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
