import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { toast } from "react-toastify";

const auth = getAuth(app);
export default function Registration() {
  const [loginData, setLoginData] = useState({});
  const info = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...loginData };
    newData[field] = value;
    setLoginData(newData);
  };

  const notifyemail = () =>
    toast.info("Check Your Email Inbox or Spam Folder To Verify Your Mail", {
      theme: "dark",
      position: "bottom-center",
      autoClose: 3000,
    });

  const notifyUser = () =>
    toast.success("User Created", {
      theme: "colored",
      position: "top-center",
      autoClose: 1000,
    });
  const notifyError = (e) =>
    toast.error(e, {
      theme: "colored",
      position: "bottom-center",
      autoClose: 1000,
    });

  const getUserData = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = loginData.firstName;
        notifyUser();

        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
          notifyemail();
          console.log("check mail");
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = notifyError(error.message);
        // ..
      });
    console.log("All Data stored");
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
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/random/?sci/600x800")',
                }}
              /> */}
              {/* Col */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">
                  Create an Account!
                </h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        onBlur={info}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        onBlur={info}
                        name="lastName"
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onBlur={info}
                      name="email"
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        onBlur={info}
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
                    <div className="md:ml-2">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="c_password"
                      >
                        Confirm Password
                      </label>
                      <input
                        onBlur={info}
                        name="confirmPassword"
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      onClick={getUserData}
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Register Account
                    </button>
                  </div>

                  {/* <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold flex items-center justify-center gap-3 bg-slate-300 text-slate-900 rounded-full hover:bg-slate-200 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      <img className="w-5" src="https://tailus.io/sources/blocks/social/preview/images/google.svg" alt="" />
                    <div>
                    <span className="">Continue with Google</span>
                    </div>
                    </button>
                  </div> */}

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
                      to="/login"
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
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
