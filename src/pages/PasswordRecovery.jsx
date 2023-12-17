import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PasswordRecovery = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <section className="form-container">
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
        <button type="submit" className="btn form__btn btn--success">
          Send recovery email
        </button>
      </form>
    </section>
  );
};

export default PasswordRecovery;
