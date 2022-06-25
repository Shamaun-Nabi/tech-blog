import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Blogs from "../Blogs/Blogs";
import { BlogContext } from "../../App";

export default function Home() {
  const [shareBlog, setShareBlog] = useContext(BlogContext);
  // const [blog, setBlog] = useState([]);
  useEffect(() => {
    fetch("database.json")
      .then((res) => res.json())
      .then((data) => {
        // setBlog(data)
        setShareBlog(data);
      });
  }, [setShareBlog]);

  return (
    <>
      <section className="py-4">
        <motion.div>
          {shareBlog.map((blog) => (
            <Blogs blog={blog} key={blog._id} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
