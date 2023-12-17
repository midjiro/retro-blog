import { useForm } from "react-hook-form";

const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset({ email: "", message: "" });
      })}
      noValidate
    >
      <div className="form-control">
        <label htmlFor="email" className="form-control__field">
          Email Address
        </label>
        <input
          {...register("email", {
            required: { value: true, message: "This is required field." },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i,
              message: "Invalid email address.",
            },
          })}
          type="email"
          id="message"
          className="form-control__input"
        />
        <span className="form-control__error">{errors.email?.message}</span>
      </div>
      <div className="form-control">
        <label htmlFor="message" className="form-control__field">
          Message
        </label>
        <textarea
          {...register("message", {
            required: { value: true, message: "This is required field" },
            maxLength: {
              value: 120,
              message: "Message must be at most of 255 characters long.",
            },
          })}
          rows="5"
          cols="30"
          id="message"
          className="form-control__input"
        />
        <span className="form-control__error">{errors.message?.message}</span>
      </div>
      <div className="btn-group">
        <button className="btn btn--success">Send</button>
        <button
          className="btn btn--danger"
          onClick={() => reset({ email: "", message: "" })}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
