import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../config";
import { getDownloadURL, ref } from "firebase/storage";

function useFetch(collectionName, id = null) {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsPending(true);
    const documentsCollection = collection(db, collectionName);
    let unsubscribe = null;

    if (!id) {
      unsubscribe = onSnapshot(documentsCollection, (snapshot) => {
        if (snapshot.empty) {
          setError({
            danger: false,
            iconClassList: "fa-solid fa-ranking-star",
            title: "Become first who published an article!",
            description: "Go to the “write” page and publish something awfull.",
          });
        } else {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        setIsPending(false);
      });
    } else {
      const docRef = doc(documentsCollection, id);
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.empty) {
          setError({
            danger: false,
            title: "Unable to load publication",
            description: "It was probably moved or deleted",
          });
        } else {
          const snapshotData = { ...snapshot.data(), id: snapshot.id };
          getDownloadURL(ref(storage, snapshotData.cover)).then((url) =>
            setData({ ...snapshotData, cover: url })
          );
        }

        setIsPending(false);
      });
    }

    return unsubscribe;
  }, []);

  return { error, isPending, data };
}

export default useFetch;
