import ContactForm from "../components/ContactForm";
import StyledConnect from "../components/styled/StyledConnect.styled";
import { sendEmail } from "../services/mail";

const Contact = () => {
  const onSubmit = (data) => {
    sendEmail(data);
  };

  return (
    <StyledConnect>
      <h2>We're Here to Hear from You</h2>
      <p>Feel free to drop us a message. We're always happy to help.</p>
      <ContactForm onSubmit={onSubmit} />
    </StyledConnect>
  );
};

export default Contact;
