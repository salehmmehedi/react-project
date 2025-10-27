import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUp from "./components/Page/SignUp";
import Login from "./components/Page/Login";
import firebaseConfig from "./components/Firebase/firebaseConfig";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />,
    </>
  );
}

export default App;
