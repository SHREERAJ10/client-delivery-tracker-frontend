import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthContext from "./context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import ClientPage from "./pages/ClientPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import DeliverablePage from "./pages/DeliverablePage.jsx";
import SearchDeliverablesPage from "./pages/SearchDeliverablesPage.jsx";
import Loader from "./components/Loader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      { index: true, Component: Dashboard },
      { path: "client", Component: ClientPage },
      { path: "client/:clientId/project", Component: ProjectPage },
      { path: "client/:clientId/project/:projectId/deliverable", Component: DeliverablePage },
      { path: "/deliverables", Component: SearchDeliverablesPage },
    ],
  },
  { path: "/login", Component: Login },
]);

function App() {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) return <Loader />

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
