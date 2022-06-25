import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../App";
import { motion } from "framer-motion";

export default function BlogInfo() {
  const [shareBlog] = useContext(BlogContext);
  // no need setShareblog here
  let navigate = useNavigate();
  const { id } = useParams();
  const blog = shareBlog.find(
    (shareBlog) => shareBlog?._id === id
  );
  console.log(blog);
  // console.log(id);

  return (
    <>
      <div className="bg-orange-400 py-5">
        <div className=" container mx-auto flex items-center gap-2 text-white cursor-pointer">
          <AiFillBackward />
          <span className="font-semibold" onClick={() => navigate(-1)}>
            back
          </span>
        </div>
      </div>
      <div className=" container mx-auto">
        <div className="flex justify-center py-2">
          <motion.img initial={{ scale: 0 }} animate={{scale:1}}
            className=" border-8 border-slate-300 shadow-md"
            src={blog?.imageURL}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
