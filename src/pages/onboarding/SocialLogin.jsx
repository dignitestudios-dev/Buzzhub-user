import React, { useState } from "react";

import { FaApple } from "react-icons/fa";

import { FacebookAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "../../components/global/Toaster";
import { Appleicon, Googleicon } from "../../assets/export";
import { appleProvider, auth, googleProvider } from "../../firebase/firebase";
import axios from '../../axios'

const SocialLogin = () => {
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [error, setError] = useState("");

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);

      if (result) {
        // const token = await result?.user?.getIdToken();
        if (result) {
          axios
            .post(`auth/dispensary-social-signup`, {
              idToken: result?._tokenResponse?.idToken,
              email: result?.user?.email,
            })
            .then(
              (response) => {
                sessionStorage.setItem("token", response?.data?.data?.token);
                if (response?.data?.success === true) {
                  navigate("/userinfo");
                } else {
                  console.error(
                    "Login failed:",
                    response?.data?.message || "Unknown error"
                  );
                  ErrorToast(
                    response?.data?.message || "Login failed. Please try again."
                  );
                }
              },
              (error) => {
                console.log(error);
                if (
                  error?.response?.status == 401 &&
                  error?.response?.data?.message == "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                }
                setAppleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setAppleLoading(false);
      setError("Cannot open apple signin modal.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      if (result) {
        const token = await result?.user?.getIdToken();

        if (token) {
          axios
            .post(`auth/dispensary-social-signup`, {
              idToken: result?._tokenResponse?.idToken,
              email: result?.user?.email,
            })
            .then(
              (response) => {
                sessionStorage.setItem("token", response?.data?.data?.token);

                if (response?.data?.success === true) {
                  navigate("/userinfo");
                } else {
                  console.error(
                    "Login failed:",
                    response?.data?.message || "Unknown error"
                  );
                  ErrorToast(
                    response?.data?.message || "Login failed. Please try again."
                  );
                }
              },
              (error) => {
                console.log(error);

                if (
                  error?.response?.status === 401 &&
                  error?.response?.data?.message === "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                } else {
                  console.error("Unexpected error:", error);
                  ErrorToast("An unexpected error occurred.");
                }

                setGoogleLoading(false);
              }
            );
        } else {
          throw new Error("Failed to retrieve token from Google login.");
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Cannot open google signin modal.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
 <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 w-full mt-4">
  {/* Google Login Button */}
  <div
    onClick={handleGoogleLogin}
    className="flex items-center justify-between bg-white text-black font-semibold text-sm w-full max-w-[400px] px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
  >
    <img src={Googleicon} alt="Google" className="w-6 h-6 mr-4" />
    <span className="flex-1 text-center">Continue with Google</span>
    {googleLoading ? (
      <FiLoader className="text-gray-700 text-xl animate-spin" />
    ) : (
      <span className="w-6 h-6"></span>
    )}
  </div>

  {/* Apple Login Button */}
  <div
    onClick={handleAppleLogin}
    className="flex items-center justify-between  text-black font-semibold text-sm w-full max-w-[400px] px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
  >
    <img src={Appleicon} alt="Apple" className="w-6 h-6 mr-4" />
    <span className="flex-1 text-center">Continue with Apple</span>
    <span className="w-6 h-6"></span> {/* Placeholder for layout consistency */}
  </div>
</div>

  );
};

export default SocialLogin;