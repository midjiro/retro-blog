import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  increment,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, storage } from "../config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ACTIONS from "../actions";

export function fetchPublication(id) {
  return (dispatch) => {
    const docRef = doc(db, "publications", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      try {
        if (snapshot.empty)
          throw new Error({
            title: "Ooops! We are unable to find this blog.",
            description:
              "It looks like given blog is moved or deleted. Contact us in case you have a questions.",
            danger: true,
          });

        dispatch({
          type: ACTIONS.FETCH_PUBLICATION,
          payload: {
            error: null,
            data: { ...snapshot.data(), id },
          },
        });
      } catch (e) {
        dispatch({
          type: ACTIONS.FETCH_PUBLICATION,
          payload: {
            error: e,
            data: null,
          },
        });
      }
    });

    return unsubscribe;
  };
}

export async function likePublication(id) {
  try {
    const docRef = doc(db, "publications", id);
    await updateDoc(docRef, {
      likes: increment(1),
    });
  } catch (e) {
    console.error(e);
  }
}

export async function deletePublication(id, cover) {
  const docRef = doc(db, "publications", id);
  try {
    const coverRef = ref(storage, cover);
    await deleteObject(coverRef);
    await deleteDoc(docRef);
  } catch (e) {
    console.error(e);
  }
}

export async function addPublication(publication) {
  try {
    const coverRef = ref(storage, publication.cover.name);
    const coverUploadingResult = uploadBytesResumable(
      coverRef,
      publication.cover,
      {
        contentType: publication.cover.type,
      }
    );

    coverUploadingResult
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((coverURL) => {
        const collectionRef = collection(db, "publications");
        addDoc(collectionRef, { ...publication, cover: coverURL, likes: 0 });
      });
  } catch (e) {
    console.error(e);
  }
}
