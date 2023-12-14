import { useForm } from "react-hook-form";
import { Button, ButtonSuccess } from "../components/styled/Button.styled";
import FormControl from "../components/styled/FormControl.styled";
import { Input } from "../components/styled/Input.styled";
import { Link, useNavigate } from "react-router-dom";
import FormError from "../components/styled/FormError.styled";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../services/user";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import StyledAuth from "../components/styled/StyledAuth.styled";

const SignIn = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  return (
    <StyledAuth>
      <h2>Welcome Back! Log In to Your Account</h2>
      <p>Welcome back! Your next adventure awaits.</p>
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
            })}
            type="password"
            id="password"
            className="form-control__input"
          />
          <FormError>{errors.password?.message}</FormError>
        </FormControl>
        <Link to="/sign-up">Have no account? Create One</Link>
        <Link to="/recovery">Forgot password?</Link>
        <ButtonSuccess type="submit" disabled={currentUser ? true : false}>
          {currentUser ? "You already logged in" : "Log in"}
        </ButtonSuccess>
      </form>
      {!currentUser && (
        <Button onClick={signInWithGoogle}>Log in with google</Button>
      )}
    </StyledAuth>
  );
};

export default SignIn;
