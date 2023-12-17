import Publication from "./Publication";

const PublicationList = ({ publications }) => {
  return (
    <div className="publication-list">
      {publications.map((publication, index) => (
        <Publication {...publication} key={index} />
      ))}
    </div>
  );
};

export default PublicationList;
