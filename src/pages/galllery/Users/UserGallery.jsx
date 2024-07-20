import { useEffect } from "react";
import { allUsersPhoto } from "../../../features/gallery/galleryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../components/loading/Loading";
import { Helmet } from "react-helmet-async";

const UserGallery = () => {
  // change deteck
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(allUsersPhoto());
  }, [dispatch]);

  if (loading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>User Gallery | KIN Dashboard</title>
      </Helmet>
      <section className="w-full p-4 bg-[#121a2d]">
        <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
          All Users images
        </h1>
        <hr className="h-[1px] bg-zinc-800 w-full border-none" />
        <div className="py-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
          {users?.map((image, index) => (
            <div key={index} className="relative">
              <figure className=" cursor-pointer">
                <PhotoProvider>
                  <PhotoView
                    src={`${
                      import.meta.env.VITE_SERVER_URL + "/public/images/users/"
                    }/${image}`}
                  >
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_URL +
                        "/public/images/users/"
                      }/${image}`}
                      alt=""
                      className="rounded-md w-full h-[250px]  border-4 border-zinc-800 object-cover"
                    />
                  </PhotoView>
                </PhotoProvider>
              </figure>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserGallery;
