import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config";
import ACTIONS from "../actions";

export function fetchPublicationList() {
  return (dispatch) => {
    try {
      const documentCollection = collection(db, "publications");
      const unsubscribe = onSnapshot(documentCollection, (snapshot) => {
        let publications = null;
        if (!snapshot.empty) {
          publications = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        }
        dispatch({
          type: ACTIONS.FETCH_PUBLICATIONS,
          payload: { error: null, publications: publications },
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
