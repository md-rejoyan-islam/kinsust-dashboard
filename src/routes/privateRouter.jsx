import Layout from "../layout/Layout";

import PrivateGuard from "./guard/PrivateGuard";
import Home from "../pages/home/Home.jsx";
import AllAdvisors from "../pages/Advisors/AllAdvisors/AllAdvisors.jsx";
import AddAdvisors from "../pages/Advisors/AddAdvisors/AddAdvisors.jsx";
import AllProgram from "../pages/program/AllProgram/AllProgram.jsx";
import AddProgram from "../pages/program/AddProgram/AddProgram.jsx";
import AllPost from "../pages/post/AllPost/AllPost.jsx";
import AddPost from "../pages/post/AddPost/AddPost.jsx";
import Subscriber from "../pages/subscriber/Subscriber.jsx";
import AddEc from "../pages/ec/AddEc/AddEc.jsx";
import AllEc from "../pages/ec/AllEc/AllEc.jsx";
import EcMembers from "../pages/ec/ecMembers/EcMembers.jsx";
import AddUsers from "../pages/Users/AddUsers/AddUsers.jsx";
import AllUsers from "../pages/Users/AllUsers/AllUsers.jsx";
import AllSlider from "../pages/slider/AllSlider/AllSlider.jsx";
import AddSlider from "../pages/slider/AddSlider/AddSlider.jsx";
import ProgramGallery from "../pages/galllery/Program/ProgramGallery.jsx";
import PostGallery from "../pages/galllery/Post/PostGallery.jsx";
import UserGallery from "../pages/galllery/Users/UserGallery.jsx";
import AdvisorGallery from "../pages/galllery/Advisors/AdvisorGallery.jsx";
import NotFound from "../pages/NotFound.jsx";
import Admin from "../pages/role/admin/Admin.jsx";
import SuperAdmin from "../pages/role/superAdmin/SuperAdmin.jsx";
import SuperAdminGuard from "./guard/SuperAdminGuard.jsx";
import Organization from "../pages/OrganizationalWeek/Organization.jsx";

const privateRouter = [
  {
    element: (
      <PrivateGuard>
        <Layout />
      </PrivateGuard>
    ),
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/users/add-user",
        element: <AddUsers />,
      },
      {
        path: "/users/all-users",
        element: <AllUsers />,
      },
      {
        path: "/advisors/all-advisors",
        element: <AllAdvisors />,
      },
      {
        path: "/advisors/add-advisor",
        element: <AddAdvisors />,
      },
      {
        path: "/sliders/all-sliders",
        element: <AllSlider />,
      },
      {
        path: "/sliders/add-slider",
        element: <AddSlider />,
      },
      {
        path: "/programs/all-programs",
        element: <AllProgram />,
      },
      {
        path: "/programs/add-program",
        element: <AddProgram />,
      },
      {
        path: "/posts/all-post",
        element: <AllPost />,
      },
      {
        path: "/posts/add-post",
        element: <AddPost />,
      },
      {
        path: "/subscriber",
        element: <Subscriber />,
      },
      {
        path: "/ecs/add-ec",
        element: <AddEc />,
      },
      {
        path: "/ecs/all-ec",
        element: <AllEc />,
      },
      {
        path: "/ecs/ec-members",
        element: <EcMembers />,
      },
      {
        path: "/gallery/program",
        element: <ProgramGallery />,
      },
      {
        path: "/gallery/post",
        element: <PostGallery />,
      },
      {
        path: "/gallery/users",
        element: <UserGallery />,
      },
      {
        path: "/gallery/advisor",
        element: <AdvisorGallery />,
      },
      {
        path: "/organizational-week",
        element: <Organization />,
      },
      {
        path: "/role/admin",
        element: (
          <SuperAdminGuard>
            <Admin />
          </SuperAdminGuard>
        ),
      },
      {
        path: "/role/super-admin",
        element: (
          <SuperAdminGuard>
            <SuperAdmin />
          </SuperAdminGuard>
        ),
      },
    ],
  },
];

export default privateRouter;
