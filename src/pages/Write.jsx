import { useNavigate } from "react-router-dom";
import { addBlog } from "../services/blogs";
import WriteForm from "../components/WriteForm";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/userReducer";
import { isAlreadyPublished } from "../services/utils";
import { toast } from "react-toastify";

const Write = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const onSubmit = async (data) => {
    const author = {
      avatar: user.photoURL,
      username: user.displayName,
      email: user.email,
      id: user.uid,
    };

    const isDuplicate = await isAlreadyPublished(data.title, author);

    if (isDuplicate) {
      toast("Blog with such title is already published.");
      return;
    }

    dispatch(
      addBlog({
        ...data,
        author,
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
