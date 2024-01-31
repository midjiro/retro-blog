import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog, index) => (
        <Blog {...blog} key={index} />
      ))}
    </div>
  );
};

export default BlogList;
