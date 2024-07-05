import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SmmryLogo from "@/assets/sm_logo.png";
import google from "@/assets/google.png";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const Footer = () => {
  const location = useLocation();

  //to get user id
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleGoogleSignOut = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Successfully signed out!");
  };

  //store user data in local storage
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("profile", JSON.stringify(userData));
      if (userData) {
        toast("Successfully signed in!", {
          icon: "🥳",
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in!");
    }
  };

  return (
    <div className="py-5 flex justify-center">
      <div>
        <ul className="flex gap-2 uppercase text-sm">
          <li>Summarize</li>|<li>About</li>|<li>API</li>|<li>Contact</li>|
          {user ? (
            <li role="button" onClick={handleGoogleSignOut}>
              Sign Out
            </li>
          ) : (
            <Dialog>
              <DialogTrigger>
                <li className="text-blue-500 uppercase" role="button">
                  Sign in
                </li>
              </DialogTrigger>
              <DialogContent className="sm:w-96">
                <div className="flex flex-col gap-5 items-center py-8">
                  <img className="h-12" src={SmmryLogo} alt="logo" />
                  <p className="text-center">
                    By continuing, you are setting up a SMMRY account and agree
                    to our User Agreement and Privacy Policy.
                  </p>
                  <Button
                    onClick={handleGoogleSignIn}
                    className="flex gap-3 rounded-xl h-auto py-3"
                  >
                    <img className="w-4 h-4" src={google} alt="G" />
                    Sign in with Google
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
