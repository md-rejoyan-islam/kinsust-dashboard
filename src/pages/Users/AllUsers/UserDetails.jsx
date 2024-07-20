import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserByEmail } from "../../../features/user/userApiSlice";
import Loading from "../../../components/loading/Loading";
import { PhotoProvider, PhotoView } from "react-photo-view";

const UserDetails = () => {
  const { email } = useParams();

  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await dispatch(getUserByEmail(email));
      if (response?.payload?.success) {
        setDetails(response?.payload?.data[0]);
        setLoading(false);
      }
    })();
  }, [dispatch, email]);

  console.log(details);

  // loading
  if (loading) return <Loading />;

  return (
    <section className="py-10 px-6 mx-auto">
      <div className="m-auto ">
        <Link
          to={"/users/all-users"}
          className="bg-blue-500 text-white font-bold hover:bg-violet-500 py-2 px-4 rounded-md text-center"
        >
          Back
        </Link>
        <div className=" py-6 lg:px-8 ">
          <div>
            <div className="flex flex-col items-center justify-center">
              <PhotoProvider>
                <PhotoView
                  src={
                    import.meta.env.VITE_SERVER_URL +
                    "/public/images/users/" +
                    details.user_photo
                  }
                >
                  <img
                    src={
                      import.meta.env.VITE_SERVER_URL +
                      "/public/images/users/" +
                      details.user_photo
                    }
                    alt={details?.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </PhotoView>
              </PhotoProvider>

              <h2 className="text-lg font-bold text-white/70">
                {details.name}
              </h2>
            </div>
            <div className="mt-4 text-zinc-400 overflow-scroll">
              <table className="w-full details-table">
                <tbody>
                  <tr>
                    <td>Role</td>
                    <td>{details.role}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{details.gender}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{details.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{details.phone}</td>
                  </tr>
                  <tr>
                    <td>Blood Group</td>
                    <td>{details.blood_group}</td>
                  </tr>
                  <tr>
                    <td>Sustian</td>
                    <td>{details.is_sustian ? "True" : "False"}</td>
                  </tr>
                  {details?.is_sustian && (
                    <>
                      <tr>
                        <td>Department</td>
                        <td>{details.department}</td>
                      </tr>
                      <tr>
                        <td>Session</td>
                        <td>{details.session}</td>
                      </tr>
                    </>
                  )}
                  {!details?.is_sustian && (
                    <>
                      <tr>
                        <td>Profession</td>
                        <td>{details.profession}</td>
                      </tr>
                      <tr>
                        <td>Organization</td>
                        <td>{details.organization}</td>
                      </tr>
                    </>
                  )}

                  <tr>
                    <td>Location</td>
                    <td>{details.location}</td>
                  </tr>
                  <tr>
                    <td>Feedback</td>
                    <td>{details.feedback}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
