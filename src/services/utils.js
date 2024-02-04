import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import { v4 as uuid4 } from "uuid";
import { storage } from "../config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export async function isAlreadyPublished(blogTitle, user) {
  try {
    const q = query(
      collection(db, "blogs"),
      where("title", "==", blogTitle),
      where("author", "==", user)
    );

    const blogSnapshot = await getDocs(q);

    return !blogSnapshot.empty;
  } catch (e) {
    console.error(e);
  }
}

export async function uploadCover(cover) {
  const coverUploadingSnapshot = await uploadBytesResumable(
    ref(storage, uuid4()),
    cover,
    {
      contentType: cover.type,
    }
  );

  const coverUploadingResult = await getDownloadURL(coverUploadingSnapshot.ref);

  return coverUploadingResult;
}
