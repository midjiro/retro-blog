import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../config";
import { store } from "../store";
import { uploadCover } from "./utils";
import { ACTIONS } from "../actions";
import { v4 as uuid4 } from "uuid";

export function fetchBlogs() {
  return async (dispatch) => {
    try {
      const blogsSnapshot = await getDocs(collection(db, "blogs"));

      if (blogsSnapshot.empty) {
        dispatch({
          type: ACTIONS.FETCH_BLOGS,
          payload: { blogs: [] },
        });
      } else {
        const blogs = blogsSnapshot.docs.map((blog) => ({
          ...blog.data(),
        }));

        dispatch({
          type: ACTIONS.FETCH_BLOGS,
          payload: { blogs },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function likeBlog(blogId, userId) {
  return async (dispatch) => {
    const state = store.getState();
    const blog = state.blogsReducer.blogs.find((blog) => blog.id === blogId);

    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
        likedBy: [...blog.likedBy, userId],
      });

      if (blog.likedBy.includes(userId))
        dispatch({
          type: ACTIONS.UNLIKE_BLOG,
          payload: { blogId, userId },
        });
      else {
        dispatch({
          type: ACTIONS.LIKE_BLOG,
          payload: {
            blogId,
            userId,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function deleteBlog(blogId, cover) {
  return async (dispatch) => {
    const docRef = doc(db, "blogs", blogId);

    try {
      await deleteObject(ref(storage, cover));
      await deleteDoc(docRef);

      dispatch({
        type: ACTIONS.DELETE_BLOG,
        payload: {
          blogId: blogId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export function addBlog({ author, cover, title, description, likedBy }) {
  return async (dispatch) => {
    try {
      const newBlog = {
        id: uuid4(),
        cover: await uploadCover(cover),
        author,
        title,
        description,
        likedBy,
      };

      await setDoc(doc(db, "blogs", newBlog.id), newBlog);
      dispatch({
        type: ACTIONS.ADD_BLOG,
        payload: {
          blog: newBlog,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}
