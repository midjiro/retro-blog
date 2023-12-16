import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  getDoc,
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

export async function likePublication(publication, userId) {
  try {
    const docRef = doc(db, "publications", publication.id);
    if (publication.likedBy.includes(userId)) {
      await updateDoc(docRef, {
        likedBy: publication.likedBy.filter((uuid) => uuid !== userId),
      });
    } else {
      await updateDoc(docRef, {
        likedBy: [...publication.likedBy, userId],
      });
    }
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
}

export async function getAuthorData(authorID) {
  try {
    const authorRef = doc(db, "users", authorID);
    let author = await getDoc(authorRef);
    author = { ...author.data(), id: author.id };

    return author;
  } catch (e) {
    console.error(e);
  }
}
