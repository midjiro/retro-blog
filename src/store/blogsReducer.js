import ACTIONS from "../actions";
import { createSelector } from "reselect";

const initialState = {
  error: null,
  blogs: null,
};

export function blogsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

    case ACTIONS.FETCH_BLOGS:
      return {
        ...state,
        error: payload.error,
        blogs: payload.blogs,
      };

    case ACTIONS.LIKE_BLOG:
      return {
        ...state,
        error: payload.error,
        blogs: state.blogs.map((blog) =>
          blog.id === payload.blogId
            ? {
                ...blog,
                likedBy: [...blog.likedBy, payload.userId],
              }
            : blog
        ),
      };

    case ACTIONS.UNLIKE_BLOG:
      return {
        ...state,
        error: payload.error,
        blogs: state.blogs.map((blog) =>
          blog.id === payload.blogId
            ? {
                ...blog,
                likedBy: blog.likedBy.filter(
                  (userId) => userId !== payload.userId
                ),
              }
            : blog
        ),
      };

    case ACTIONS.ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, payload.blog],
      };
    case ACTIONS.DELETE_BLOG:
      return {
        ...state,
        error: payload.error,
        blogs: state.blogs.filter((blog) => blog.id !== payload.blogId),
      };
  }
}

export const selectBlogs = (state) => [
  state.blogsReducer.error,
  state.blogsReducer.blogs,
];

export const selectSingleBlog = (blogId) =>
  createSelector(selectBlogs, ([error, blogs]) => [
    error,
    blogs.find((blog) => blog.id === blogId),
  ]);

export const filterBlogsByTitle = (title) =>
  createSelector(selectBlogs, ([error, blogs]) => {
    if (!title) return [error, blogs];

    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(title)
    );

    return [error, filteredBlogs];
  });
