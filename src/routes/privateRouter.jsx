import Layout from "../layout/Layout";
import PrivateGuard from "./guard/PrivateGuard";
import Home from "../pages/home/Home.jsx";
import AllAdvisors from "../pages/advisors/allAdvisors/AllAdvisors.jsx";
import AddAdvisors from "../pages/advisors/addAdvisors/AddAdvisors.jsx";
import AllProgram from "../pages/program/allProgram/AllProgram.jsx";
import AddProgram from "../pages/program/addProgram/AddProgram.jsx";
import AllPost from "../pages/post/allPost/AllPost.jsx";
import AddPost from "../pages/post/addPost/AddPost.jsx";
import Subscriber from "../pages/subscriber/Subscriber.jsx";
import AddEc from "../pages/ec/addEc/AddEc.jsx";
import AllEc from "../pages/ec/allEc/AllEc.jsx";
import EcMembers from "../pages/ec/ecMembers/EcMembers.jsx";
import AddUsers from "../pages/users/addUsers/AddUsers.jsx";
import AllUsers from "../pages/users/allUsers/AllUsers.jsx";
import AllSlider from "../pages/slider/allSlider/AllSlider.jsx";
import AddSlider from "../pages/slider/addSlider/AddSlider.jsx";
import ProgramGallery from "../pages/galllery/program/ProgramGallery.jsx";
import PostGallery from "../pages/galllery/post/PostGallery.jsx";
import UserGallery from "../pages/galllery/users/UserGallery.jsx";
import AdvisorGallery from "../pages/galllery/advisors/AdvisorGallery.jsx";
import NotFound from "../pages/NotFound.jsx";
import Admin from "../pages/role/admin/Admin.jsx";
import SuperAdmin from "../pages/role/superAdmin/SuperAdmin.jsx";
import SuperAdminGuard from "./guard/SuperAdminGuard.jsx";
import Organization from "../pages/organizationalWeek/Organization.jsx";
import UserDetails from "../pages/users/allUsers/UserDetails.jsx";
import Profile from "../pages/profile/Profile.jsx";

const privateRouter = [
  {
    element: (
      <PrivateGuard>
        <Layout />
      </PrivateGuard>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
        path: "/users/all-users/:email",
        element: <UserDetails />,
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
