import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const SignUp = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <section className="form-container">
      <h2>Join the Community - Create Your Account</h2>
      <p>Create your account and become part of something amazing.</p>
      <form
        action=""
        onSubmit={handleSubmit((data) =>
          onSubmit(data)
            .then((user) => toast(`Welcome back, ${user.displayName}!`))
            .then(() => navigate("/", { replace: true }))
            .catch((e) => toast(e.message))
        )}
        noValidate
        className="form"
      >
        <div className="form-control">
          <label htmlFor="username" className="form-control__field">
            Username
          </label>
          <input
            {...register("username", {
              required: { value: true, message: "This is required field." },
              maxLength: {
                value: 16,
                message: "Username must be at most 16 characters long.",
              },
            })}
            type="text"
            id="username"
            className="form-control__input"
          />
          <span className="form-control__error">{errors.email?.message}</span>
        </div>
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
              maxLength: {
                value: 16,
                message: "Password should be at most 16 characters long.",
              },
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long.",
              },
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
          <Link to="/sign-in">Already have an account? sign in</Link>
        </div>
        <button
          type="submit"
          className="btn form__btn btn--success"
          disabled={isAuthenticated ? true : false}
        >
          {isAuthenticated ? "You already logged in" : "Create an account"}
        </button>
      </form>
    </section>
  );
};

export default SignUp;
