import { createBrowserRouter } from "react-router-dom";
import List from "./pages/list";
import Detail from "./pages/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/detail/:idNum",
    element: <Detail />,
  },
]);

export default router;
