import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthContext from "./context/AuthContext.jsx";
import { useContext, useEffect } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,
    children: [{ index: true, Component: Dashboard }],
  },
  { path: "/login", Component: Login },
]);

function App() {

  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
