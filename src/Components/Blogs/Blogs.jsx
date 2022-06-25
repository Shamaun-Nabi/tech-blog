import React from "react";
import { BsCursorFill } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Blogs({ blog }) {
  let navigate = useNavigate();

  return (
    <>
      {/* Image area */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto">
          <div className=" flex justify-center md:justify-end">
            <img
              className="w-[400px] border-4 shadow-md"
              src={blog.imageURL}
              alt=""
            />
          </div>
          {/* text-area */}
          <div>
            <div className="mx-8 md:text-left text-center">
              <h6 className="text-lg font-extrabold">{blog.title}</h6>
              <p className="my-2 md:my-4 text-slate-600 flex items-center md:justify-start justify-center gap-2">
                <BsCursorFill className="text-orange-500" />
                <span className="flex items-center gap-2 ">
                  <span className="text-teal-600">{blog.admin}</span>{" "}
                  <HiBadgeCheck className="text-indigo-600" />
                </span>
              </p>
              <p className="text-slate-500 ">
                {blog.blog.slice(0, 300)}...
                <span
                  onClick={() => navigate(`blogsinfo/${blog._id}`)}
                  className="text-teal-400 cursor-pointer"
                  to="videos"
                >
                  See more
                </span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
