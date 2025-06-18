import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./shared/components/RootLayout/RootLayout";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  }
]);
