import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { app } from "../FIrebase/firebase.init";
import axios from "axios";

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

  const updateUser = async (updatedData) => {
    await updateProfile(auth.currentUser, updatedData);
    setUser({ ...auth.currentUser });
  };

  // middlware
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        setUser(currentuser);
        if (currentuser?.email) {
          const user = {email: currentuser.email};

          axios.post('https://task-managment-server-jilq.onrender.com/jwt',user,{withCredentials : true})
          .then(res=>console.log(res.data)
          )
        }
        setloading(false);
      } else {
        setloading(false);
        setUser(null);
      }
    });
    return () => {
       unsubscriber();
    };
  });

  const authinfo = { handlenewuser, loginuser,updateUser, user,setUser, handlelogout };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
