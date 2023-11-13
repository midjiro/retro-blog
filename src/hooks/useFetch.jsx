import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../config";
import { getDownloadURL, ref } from "firebase/storage";

function useFetch(collectionName, id = null) {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const documentsCollection = collection(db, collectionName);
    let unsubscribe = null;

    const handleSnapshot = (snapshot) => {
      if (snapshot.empty) {
        setError({
          danger: false,
          title: id
            ? "Unable to load publication"
            : "Become first who published an article!",
          description: id
            ? "It was probably moved or deleted"
            : "Go to the “write” page and publish something awfull.",
        });
      } else {
        if (id) {
          const snapshotData = { ...snapshot.data(), id: snapshot.id };
          getDownloadURL(ref(storage, snapshotData.cover)).then((url) =>
            setData({ ...snapshotData, cover: url })
          );
        } else {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      }
      setIsPending(false);
    };

    setIsPending(true);

    if (!id) {
      unsubscribe = onSnapshot(documentsCollection, handleSnapshot);
    } else {
      const docRef = doc(documentsCollection, id);
      unsubscribe = onSnapshot(docRef, handleSnapshot);
    }

    return () => unsubscribe();
  }, [collectionName, id]);

  return { error, isPending, data };
}

export default useFetch;
