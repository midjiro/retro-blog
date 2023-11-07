import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Container from "./components/styled/Container.styled";
import { db } from "./config";
import { collection, onSnapshot } from "firebase/firestore";
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

      // ? Check internet connection before fetching data
      if (!navigator.onLine) throw Error("No internet connection.");

      const query = collection(db, "publications");
      // ? Handle data changes and re-render corresponding component automatically
      const unsubscribe = onSnapshot(query, (snapshot) => {
        updatePublications(snapshot);
        setIsPending(false);
      });

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

  return (
    <>
      <Header />
      <Container>
        {isPending && !error && (
          <Message
            iconClassList={"fa-solid fa-spinner fa-spin"}
            title={"We are loading publications.."}
            description={"Dear Reader be patient, it may take a while"}
          />
        )}
        {error && (
          <Message
            iconClassList={"fa-solid fa-triangle-exclamation"}
            {...error}
            danger={true}
          />
        )}

        {!isPending && !error && <Home publications={publications} />}
      </Container>
    </>
  );
}

export default App;
