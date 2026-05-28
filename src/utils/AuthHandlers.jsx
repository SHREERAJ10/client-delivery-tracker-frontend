import { auth } from "../../config/firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const handleLogin = async (email, password) => {
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logout = async () => {
  await signOut(auth).catch((err) => {
    console.log(err);
  });
};
