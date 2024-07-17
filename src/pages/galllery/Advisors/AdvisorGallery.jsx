import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allAdvisorsPhoto } from "../../../features/gellery/gelleryApiSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../components/Loading";

const AdvisorGallery = () => {
  const dispatch = useDispatch();
  const { advisors, loading } = useSelector((state) => state.gellery);

  useEffect(() => {
    dispatch(allAdvisorsPhoto());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <section className="w-full p-4 bg-[#121a2d]">
      <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
        All Advisors images
      </h1>
      <hr className="h-[1px] bg-zinc-800 w-full border-none" />
      <div className="  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-4">
        {advisors?.map((image, index) => (
          <div key={index} className="relative">
            <figure className="cursor-pointer">
              <PhotoProvider>
                <PhotoView
                  src={`${
                    import.meta.env.VITE_SERVER_URL + "/public/images/advisors/"
                  }/${image}`}
                >
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL +
                      "/public/images/advisors/"
                    }/${image}`}
                    alt=""
                    className="rounded-md w-full  h-[250px]  border-4 border-zinc-800 object-cover"
                  />
                </PhotoView>
              </PhotoProvider>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisorGallery;
