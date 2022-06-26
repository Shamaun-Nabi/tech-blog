import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);
export default function Login() {
  const [authData, setAuthData] = useState({});

  const getAuthData = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...authData };
    newData[field] = value;
    setAuthData(newData);
    console.log(authData);
  };

  const manualLoginHandeler = (e) => {
    e.preventDefault();
    console.log(authData?.email, authData?.password);
    signInWithEmailAndPassword(auth, authData?.email, authData?.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = authData.email;
        console.log(user);
        notifyLogin();
        Navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notifyError("Something wrong");
        console.log(errorMessage);
      });
  };

  const notifyLogin = () =>
    toast.success("Login Successfull", {
      theme: "dark",
      position: "top-center",
      autoClose: 1000,
    });
  const notifyError = (e) =>
    toast.error(e, {
      theme: "colored",
      position: "top-center",
      autoClose: 2000,
    });

  const googleHandeler = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const user = result.user;
        notifyLogin();
      })
      .catch((error) => {
        notifyError();
        // ...
      });
  };
  return (
    <>
      <>
        {/* component */}
        {/* Container */}
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            {/* Row */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
              {/* Col */}
              {/* <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg border-4 border-slate-300"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/random/?secure/600x800")',
                }}
              /> */}
              {/* Col */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Login Your Account!
                </h3>
                <form onSubmit={manualLoginHandeler} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onBlur={manualLoginHandeler}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between ">
                    <div className="mb-4 md:mr-2 md:mb-0 w-full">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        onBlur={manualLoginHandeler}
                        name="password"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                      {/* <p className="text-xs italic text-red-500">
                        Please choose a password.
                      </p> */}
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={manualLoginHandeler}
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login Your Account
                    </button>
                  </div>
                  <hr className="mb-3 border-t" />
                  <div className=" mb-3">
                    <div className="flex justify-center m-2">
                      <button
                        onClick={googleHandeler}
                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                      >
                        <div className="relative flex items-center space-x-4 justify-center">
                          <FcGoogle />
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Continue with Google
                          </span>
                        </div>
                      </button>
                    </div>
                    {/* <div className="flex justify-center m-2">
                      <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                        <div className="relative flex items-center space-x-4 justify-center">
                          <AiFillGithub />
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Continue with Github
                          </span>
                        </div>
                      </button>
                    </div> */}
                    {/* <div className="flex justify-center m-2">
                      <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                        <div className="relative flex items-center space-x-4 justify-center">
                          <BsFacebook className="text-in" />
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Continue with Facebook
                          </span>
                        </div>
                      </button>
                    </div> */}
                  </div>

                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="/"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <Link
                      to="/register"
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Don't have an account? Register!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
