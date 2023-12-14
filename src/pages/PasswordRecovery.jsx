import { useForm } from "react-hook-form";
import { ButtonSuccess } from "../components/styled/Button.styled";
import { toast } from "react-toastify";
import FormControl from "../components/styled/FormControl.styled";
import { Input } from "../components/styled/Input.styled";
import FormError from "../components/styled/FormError.styled";
import { useNavigate } from "react-router-dom";
import StyledAuth from "../components/styled/StyledAuth.styled";

const PasswordRecovery = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <StyledAuth>
      <h2>Reclaim Your Access: Password Recovery</h2>
      <p>
        Reset your password effortlessly and regain control of your account.
        We're here to help you get back to what matters most.
      </p>
      <form
        action=""
        onSubmit={handleSubmit((data) =>
          onSubmit(data)
            .then(() =>
              toast("Recovery email sent. Try again with new password!")
            )
            .then(() => navigate("/sign-in", { replace: true }))
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
          ></Input>
          <FormError>{errors.email?.message}</FormError>
        </FormControl>
        <ButtonSuccess type="submit">Send recovery email</ButtonSuccess>
      </form>
    </StyledAuth>
  );
};

export default PasswordRecovery;
