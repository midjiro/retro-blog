import { useForm } from "react-hook-form";
import { Input, TextArea } from "./styled/Input.styled";
import FormControl from "./styled/FormControl.styled";
import ButtonGroup from "./styled/ButtonGroup.styled";
import { ButtonDanger, ButtonSuccess } from "./styled/Button.styled";
import FormError from "./styled/FormError.styled";

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
    >
      <FormControl>
        <label htmlFor="email">Email Address</label>
        <Input
          {...register("email", {
            required: { value: true, message: "This is required field." },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i,
              message: "Invalid email address.",
            },
          })}
          type="email"
          id="message"
        />
        <FormError>{errors.email?.message}</FormError>
      </FormControl>
      <FormControl>
        <label htmlFor="message">Message</label>
        <TextArea
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
        />
        <FormError>{errors.message?.message}</FormError>
      </FormControl>
      <ButtonGroup>
        <ButtonSuccess>Send</ButtonSuccess>
        <ButtonDanger onClick={() => reset({ email: "", message: "" })}>
          Clear
        </ButtonDanger>
      </ButtonGroup>
    </form>
  );
};

export default ContactForm;
