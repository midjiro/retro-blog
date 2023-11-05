import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Container from "./components/styled/Container.styled";
import { db } from "./config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Message from "./components/Message";

function App() {
  const [publications, setPublications] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updatePublications = (query) => {
    if (query.empty) return;

    const newPublications = query.docs.map((doc) => doc.data());
    setPublications(newPublications);
  };

  useEffect(() => {
    try {
      setIsPending(true);

      const query = collection(db, "publications");
      // ? Handle data changes and re-render corresponding component automatically
      const unsubscribe = onSnapshot(query, (snapshot) => {
        updatePublications(snapshot);
      });

      setIsPending(false);

      // ? Cleanup: unsubscribe from handling data changes
      return () => {
        unsubscribe();
      };
    } catch (e) {
      setError({
        iconClassList: "fa-solid fa-triangle-exclamation",
        title: "Ooops! Something went wrong.",
        description:
          "We are unable to load publications. Try to check your connection and refresh the page.",
      });
    }
  }, []);

  if (isPending)
    return (
      <>
        <Header />
        <Container>
          <Message
            iconClassList={"fa-solid fa-spinner fa-spin"}
            title={"We are loading publications.."}
            description={"Dear Reader be patient, it may take a while"}
          />
        </Container>
      </>
    );
  else if (error)
    return (
      <>
        <Header />
        <Container>
          <Message
            iconClassList={"fa-solid fa-triangle-exclamation"}
            {...error}
            danger={true}
          />
        </Container>
      </>
    );

  return (
    <>
      <Header />
      <Container>
        <Home publications={publications} />
      </Container>
    </>
  );
}

export default App;
