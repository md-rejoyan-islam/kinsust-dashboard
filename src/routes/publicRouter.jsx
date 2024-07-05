import Login from "../pages/login/LoginPage/Login";
import NotFound from "../pages/NotFound";
import PublicGuard from "./guard/PublicGuard";

const publicRouter = [
  {
    element: <PublicGuard />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export default publicRouter;
