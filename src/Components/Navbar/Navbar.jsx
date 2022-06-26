import React, { useEffect, useState } from "react";
import logo from "../../logo.webp";
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import app from "../Firebase/Firebase.init";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth(app);
export default function Navbar() {
  const [loginUser, setLoginUser] = useState({});

  const notifyLogout = () =>
    toast.error("Logout Successfull", {
      theme: "dark",
      position: "top-center",
      autoClose: 1000,
    });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setLoginUser(user);
        navigate("/");
        // ...
      } else {
        setLoginUser({});
        // User is signed out
        // ...
      }
    });
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        notifyLogout();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  let { pathname } = useLocation();
  let navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const animateNav = () => {
    setOpen(!open);
    open ? setSlide(0) : setSlide(1);
  };
  // const [animattion, setAnimation] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={
          pathname.includes("blogsinfo") ? `hidden` : " py-5 shadow-md"
        }
      >
        <header className="flex items-center justify-between container mx-auto relative">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <motion.img
              // onClick={() => navigate("/")}
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              className="w-52"
              src={logo}
              alt=""
            />
          </div>
          <motion.div className="lg:block md:block hidden">
            <ul className="font-semibold flex gap-5">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `text-orange-400 border-b-2 transition-all ease-in`
                    : "text-black"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `text-orange-400 border-b-2 transition-all ease-in`
                    : "text-black"
                }
                to="/videos"
              >
                Videos
              </NavLink>
              {loginUser?.uid ? <li>{loginUser?.displayName}</li> : ""}

              {loginUser?.uid ? (
                <li
                  className="  cursor-pointer hover:text-orange-400 border-b-2 transition-all ease-in"
                  onClick={signOutUser}
                >
                  Logout
                </li>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `text-orange-400 border-b-2 transition-all ease-in`
                      : "text-black"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </ul>
          </motion.div>
          {/* <div>
            <img className="w-[60px] h-[60px] rounded-full object-fill"
              src="https://source.unsplash.com/random/?man/40x40
"
              alt=""
            />
          </div> */}
          <div className="lg:hidden md:hidden block text-3xl p-4">
            <span
              onClick={() => animateNav()}
              className="hover:text-orange-500 transition ease-in hover:shadow-md"
            >
              {open ? <MdOutlineCancel /> : <RiMenu2Fill />}
            </span>
          </div>
        </header>
      </div>
      <motion.div
        animate={{ scale: slide }}
        // animate={{ skewX: zoom }}
        transition={{ type: "spring" }}
        className={`bg-slate-100 shadow-lg ${open ? "block" : "hidden"}`}
      >
        <ul className="font-semibold  ">
          {loginUser?.uid ? (
            <li className="py-2 text-center hover:bg-slate-800  transition-all duration-300 ease-in hover:text-white">
              {loginUser.displayName}
            </li>
          ) : (
            " "
          )}
          <li className="py-2 text-center hover:bg-slate-800 transition-all duration-300 ease-in hover:text-white">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-orange-400 border-b-2 transition-all ease-in`
                  : "text-black"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="py-2 text-center hover:bg-slate-800  transition-all duration-300 ease-in hover:text-white">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-orange-400 border-b-2 transition-all ease-in`
                  : "text-black"
              }
              to="videos"
            >
              Videos
            </NavLink>
          </li>
          <li className="py-2 text-center hover:bg-slate-800  transition-all duration-300 ease-in hover:text-white">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-orange-400 border-b-2 transition-all ease-in`
                  : "text-black"
              }
              to="/login"
            >
              login
            </NavLink>
          </li>
          <li className="py-2 text-center hover:bg-slate-800  transition-all duration-300 ease-in hover:text-white">
            Logout
          </li>
        </ul>
      </motion.div>
    </>
  );
}
