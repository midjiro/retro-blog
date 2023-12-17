const Message = ({ iconClassList, title, description }) => {
  return (
    <article className="message">
      <i className={`fa-2x ${iconClassList} message__icon`}></i>
      <h3 className="message__title">{title}</h3>
      <p className="message__description">{description}</p>
    </article>
  );
};

export default Message;
