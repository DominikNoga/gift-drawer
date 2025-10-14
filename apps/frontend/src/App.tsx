import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MODAL_PORTAL_ID } from "@gd/shared/constants/const";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div id={MODAL_PORTAL_ID}></div>
    </>
  );
}

export default App;