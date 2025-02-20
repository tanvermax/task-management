import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../FIrebase/firebase.init";

export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  // register
  const handlenewuser = (email, password) => {
    setUser(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login
  const loginuser = (email, password) => {
    setUser(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   logout
  const handlelogout = () => {
    setloading(true);
    return signOut(auth);
  };
  // middlware
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        setUser(currentuser);
        setloading(false);
      } else {
        setloading(true);
        setUser(null);
      }
    });
    return () => {
      return unsubscriber;
    };
  });

  const authinfo = { handlenewuser, loginuser, user, handlelogout };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
