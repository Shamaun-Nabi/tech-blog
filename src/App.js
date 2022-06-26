// import './App.css';

import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogInfo from "./Components/BlogInfo/BlogInfo";
import Emailverify from "./Components/Email Verified/Emailverify";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Notfound from "./Components/Notfound/Notfound";
import Registration from "./Components/Registration/Registration";
import Video from "./Components/Video/Video";

export const BlogContext = createContext();

function App() {
  const [shareBlog, setShareBlog] = useState([]);
  // console.log("first", shareBlog);
  return (
    <>
      <BlogContext.Provider value={[shareBlog, setShareBlog]}>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogsinfo/:id" element={<BlogInfo />} />
          <Route path="videos" element={<Video />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="verify" element={<Emailverify />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BlogContext.Provider>
    </>
  );
}
export default App;
