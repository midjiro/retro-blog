import { useForm } from "react-hook-form";
import { ButtonSuccess } from "../components/styled/Button.styled";
import FormControl from "../components/styled/FormControl.styled";
import { Input } from "../components/styled/Input.styled";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../components/styled/FormError.styled";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import StyledAuth from "../components/styled/StyledAuth.styled";

const SignUp = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <StyledAuth>
      <h2>Join the Community - Create Your Account</h2>
      <p>Create your account and become part of something amazing.</p>
      <form
        action=""
        onSubmit={handleSubmit((data) =>
          onSubmit(data)
            .then((user) => toast(`Welcome back, ${user.email}!`))
            .then(() => navigate("/", { replace: true }))
            .catch((e) => toast(e.message))
        )}
        noValidate
      >
        <FormControl>
          <label htmlFor="email">Email Address</label>
          <Input
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
          <FormError>{errors.email?.message}</FormError>
        </FormControl>
        <FormControl className="form-control">
          <label htmlFor="password" className="form-control__field">
            Password
          </label>
          <Input
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
          <FormError>{errors.password?.message}</FormError>
        </FormControl>
        <Link to="/sign-in">Already have an account? sign in</Link>
        <ButtonSuccess type="submit" disabled={isAuthenticated ? true : false}>
          {isAuthenticated ? "You already logged in" : "Create an account"}
        </ButtonSuccess>
      </form>
    </StyledAuth>
  );
};

export default SignUp;
