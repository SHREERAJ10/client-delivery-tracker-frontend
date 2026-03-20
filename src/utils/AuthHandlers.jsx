import { auth } from "../../config/firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const handleLogin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
};

export const logout = () => {
  signOut(auth).catch((err) => {
    console.log(err);
  });
};
