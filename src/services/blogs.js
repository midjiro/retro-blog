import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../config";
import ACTIONS from "../actions";
import { store } from "../store";
import { selectBlogs } from "../store/blogsReducer";

export function fetchBlogs() {
  return async (dispatch) => {
    try {
      const blogsSnapshot = await getDocs(collection(db, "blogs"));

      if (blogsSnapshot.empty) {
        dispatch({
          type: ACTIONS.FETCH_BLOGS,
          payload: { error: null, blogs: null },
        });
      }

      const blogs = blogsSnapshot.docs.map((blog) => ({
        ...blog.data(),
        id: blog.id,
      }));

      dispatch({
        type: ACTIONS.FETCH_BLOGS,
        payload: { error: null, blogs },
      });
    } catch (e) {
      dispatch({
        type: ACTIONS.FETCH_BLOGS,
        payload: { error: e, blogs: null },
      });
    }
  };
}

export function likeBlog(blogId, userId) {
  return async (dispatch) => {
    const state = store.getState();
    const blog = state.publicationsReducer.blogs.find(
      (blog) => blog.id === blogId
    );

    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
        likedBy: [...blog.likedBy, userId],
      });

      if (blog.likedBy.includes(userId))
        dispatch({
          type: ACTIONS.UNLIKE_BLOG,
          payload: { error: null, blogId, userId },
        });
      else {
        dispatch({
          type: ACTIONS.LIKE_BLOG,
          payload: {
            error: null,
            blogId,
            userId,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: ACTIONS.LIKE_BLOG,
        payload: {
          error: e,
          blogId,
          userId,
        },
      });
    }
  };
}

export function deleteBlog(blogId, cover) {
  return async (dispatch) => {
    const docRef = doc(db, "blogs", blogId);

    try {
      const coverRef = ref(storage, cover);
      await deleteObject(coverRef);
      await deleteDoc(docRef);

      dispatch({
        type: ACTIONS.DELETE_BLOG,
        payload: {
          error: null,
          blogId: blogId,
        },
      });
    } catch (e) {
      dispatch({
        type: ACTIONS.DELETE_BLOG,
        payload: {
          error: e,
          blogId: blogId,
        },
      });
    }
  };
}

async function uploadCover(cover) {
  const coverRef = ref(storage, cover.name);
  const coverUploadingSnapshot = await uploadBytesResumable(coverRef, cover, {
    contentType: cover.type,
  });

  const coverUploadingResult = await getDownloadURL(coverUploadingSnapshot.ref);

  return coverUploadingResult;
}

export function addBlog({ author, cover, title, description, likedBy }) {
  return async (dispatch) => {
    try {
      const newCoverURL = await uploadCover(cover);
      const blogsCollection = collection(db, "blogs");
      const newBlog = {
        cover: newCoverURL,
        author,
        title,
        description,
        likedBy,
      };

      // const result = await isAlreadyPublished(title, author.username);
      // console.log("Is published: ", result);

      addDoc(blogsCollection, newBlog);
      dispatch({
        type: ACTIONS.ADD_BLOG,
        payload: {
          error: null,
          blog: newBlog,
        },
      });
    } catch (e) {
      dispatch({
        type: ACTIONS.ADD_BLOG,
        payload: {
          error: e,
          blog: null,
        },
      });
    }
  };
}
