import ACTIONS from "../actions";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { selectPublication } from "../store/publicationReducer";

export function fetchPublication(id) {
  return async (dispatch) => {
    const docRef = doc(db, "publications", id);
    try {
      const snapshot = await getDoc(docRef);

      if (snapshot.empty)
        throw new Error({
          title: "Unable to find the publication you are looking for.",
          description: "It has probably moved or deleted.",
          danger: true,
        });

      const data = { ...snapshot.data(), id };
      const coverRef = ref(storage, data.cover);
      data.cover = await getDownloadURL(coverRef);
      dispatch({
        type: ACTIONS.FETCH_PUBLICATION,
        payload: { error: null, data },
      });
    } catch (e) {
      dispatch({
        type: ACTIONS.FETCH_PUBLICATION,
        payload: { error: e, data: null },
      });
    }
  };
}

export function likePublication() {
  return async (dispatch, getState) => {
    const currentState = getState();
    const [_, publication] = selectPublication(currentState);

    const docRef = doc(db, "publications", publication.id);
    try {
      await updateDoc(docRef, { likes: publication.likes + 1 });
      dispatch({ type: ACTIONS.LIKE_PUBLICATION, payload: { error: null } });
    } catch (e) {
      dispatch({ type: ACTIONS.LIKE_PUBLICATION, payload: { error: e } });
    }
  };
}

export function deletePublication() {
  return async (dispatch, getState) => {
    const currentState = getState();
    const [_, publication] = selectPublication(currentState);

    const docRef = doc(db, "publications", publication.id);

    try {
      const coverRef = ref(storage, publication.cover);
      await deleteObject(coverRef);
      await deleteDoc(docRef);
      dispatch({ type: ACTIONS.DELETE_PUBLICATION, payload: { error: null } });
    } catch (e) {
      dispatch({ type: ACTIONS.DELETE_PUBLICATION, payload: { error: e } });
    }
  };
}
