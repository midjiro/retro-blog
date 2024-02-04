import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logIn, logInWithGoogle } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/userReducer";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <section className="form-container">
      <h2>Welcome Back! Log In to Your Account</h2>
      <p>Welcome back! Your next adventure awaits.</p>
      <form
        action=""
        onSubmit={handleSubmit((data) =>
          logIn(data)
            .then((user) => toast(`Welcome back, ${user.displayName}!`))
            .then(() => navigate("/", { replace: true }))
            .catch((e) => toast(e.message))
        )}
        noValidate
        className="form"
      >
        <div className="form-control">
          <label htmlFor="email" className="form-control__field">
            Email Address
          </label>
          <input
            {...register("email", {
              required: { value: true, message: "This is required field." },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: "Invalid email address.",
              },
            })}
            type="email"
            id="email"
            className="form-control__input"
          />
          <span className="form-control__error">{errors.email?.message}</span>
        </div>
        <div className="form-control">
          <label htmlFor="password" className="form-control__field">
            Password
          </label>
          <input
            {...register("password", {
              required: { value: true, message: "This is required field." },
            })}
            type="password"
            id="password"
            className="form-control__input"
          />
          <span className="form-control__error">
            {errors.password?.message}
          </span>
        </div>
        <div className="form__link-group">
          <Link to="/sign-up">Have no account? Create One</Link>
          <Link to="/recovery">Forgot password?</Link>
        </div>
        <button
          type="submit"
          className="btn form__btn btn--success"
          disabled={isAuthenticated ? true : false}
        >
          {isAuthenticated ? "You already logged in" : "Log in"}
        </button>
      </form>
      <button
        className="btn"
        disabled={isAuthenticated ? true : false}
        onClick={logInWithGoogle}
      >
        Log in with google
      </button>
    </section>
  );
};

export default SignIn;
