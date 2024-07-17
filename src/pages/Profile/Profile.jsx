import { Helmet } from "react-helmet-async";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile | KIN Dashboard</title>
      </Helmet>
      <section className="w-full p-4 bg-[#121a2d]">
        <h1>Profile</h1>
      </section>
    </>
  );
};

export default Profile;
