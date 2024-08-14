import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdvisors } from "../../features/advisor/advisorApiSlice";
import { allPosts } from "../../features/post/postApiSlice";
import { allUsers } from "../../features/user/userApiSlice";
import { getAllProgram } from "../../features/program/programApiSlice";
import { useEffect } from "react";

export default function Home() {
  const { posts } = useSelector((state) => state.post);
  const { programs } = useSelector((state) => state.program);
  const { advisors } = useSelector((state) => state.advisor);

  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdvisors());
    dispatch(allPosts());
    dispatch(allUsers());
    dispatch(getAllProgram());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home | KIN Dashboard</title>
      </Helmet>
      <div className=" px-4 py-10 sm:px-10">
        <h1 className="text-xl font-semibold uppercase sm:text-4xl text-center text-white">
          Summary
        </h1>
        <div className="p-10 flex gap-6 flex-wrap justify-center ite">
          <div className="border border-slate-800 text-slate-400 min-w-[200px] rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Posts
            </h2>
            <p className="text-4xl text-center font-bold">
              {posts?.data?.length}
            </p>
          </div>
          <div className="border min-w-[200px] border-slate-800 text-slate-400 rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Programs
            </h2>
            <p className="text-4xl text-center font-bold">
              {programs?.data?.length}
            </p>
          </div>
          <div className="border min-w-[200px] border-slate-800 text-slate-400 rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Advisors
            </h2>
            <p className="text-4xl text-center font-bold">{advisors?.length}</p>
          </div>
          <div className="border border-slate-800 text-slate-400 min-w-[200px] rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Users
            </h2>
            <p className="text-4xl text-center font-bold">
              {users.filter((data) => data.role === "user")?.length}
            </p>
          </div>

          <div className="border border-slate-800 text-slate-400 min-w-[200px] rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Superadmin
            </h2>
            <p className="text-4xl text-center font-bold">
              {users.filter((data) => data.role === "superAdmin")?.length}
            </p>
          </div>
          <div className="border border-slate-800 text-slate-400 min-w-[200px] rounded-md p-8 bg-green-400/5">
            <h2 className="font-semibold text-xl pb-2 text-center uppercase">
              Admin
            </h2>
            <p className="text-4xl text-center font-bold">
              {users.filter((data) => data.role === "admin")?.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
