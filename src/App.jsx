import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: ProtectedRoute,
      children: [
        { index: true, Component: Dashboard },
      ],
    },
    { path: "/login", Component: Login },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
