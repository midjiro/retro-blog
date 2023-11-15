import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config";
import ACTIONS from "../actions";

export function fetchPublicationList() {
  return (dispatch) => {
    try {
      const documentCollection = collection(db, "publications");
      const unsubscribe = onSnapshot(documentCollection, (snapshot) => {
        if (snapshot.empty)
          throw new Error({
            title: "Become first who published an article!",
            description: "Go to the “write” page and publish something awfull.",
            danger: false,
          });
        const publications = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch({
          type: ACTIONS.FETCH_PUBLICATIONS,
          payload: { error: null, publications },
        });
      });

      return unsubscribe;
    } catch (e) {
      dispatch({
        type: ACTIONS.FETCH_PUBLICATIONS,
        payload: { error: e, publications: null },
      });
    }
  };
}
