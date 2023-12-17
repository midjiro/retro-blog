import { useState } from "react";
import Message from "../Message";

const ConnectionCheck = ({ children }) => {
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  window.addEventListener("online", () => {
    setIsConnected(true);
  });
  window.addEventListener("offline", () => {
    setIsConnected(false);
  });

  if (!isConnected)
    return (
      <Message
        iconClassList={"fa-solid fa-triangle-exclamation"}
        title={"Ooops! Something went wrong."}
        description={
          "We are unable to load publication. Try to check your connection and refresh the page."
        }
      />
    );

  return <>{children}</>;
};

export default ConnectionCheck;
