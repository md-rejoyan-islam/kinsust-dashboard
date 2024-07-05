import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProgramsPhoto } from "../../../features/gellery/gelleryApiSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ProgramGallery = () => {
  const dispatch = useDispatch();

  const { programs, loading } = useSelector((state) => state.gellery);

  useEffect(() => {
    dispatch(allProgramsPhoto());
  }, [dispatch]);

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <section className="w-full p-4 bg-[#121a2d]">
      <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
        All Programs images
      </h1>
      <hr className="h-[1px] bg-zinc-700 w-full border-none" />
      <div className=" p-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
        {programs?.map((image, index) => (
          <div key={index} className="relative">
            <figure className="cursor-pointer">
              <PhotoProvider>
                <PhotoView
                  src={`${
                    import.meta.env.VITE_SERVER_URL + "/public/images/programs/"
                  }/${image}`}
                >
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL +
                      "/public/images/programs/"
                    }/${image}`}
                    alt=""
                    className="rounded-md w-full h-[300px]  border-4 border-zinc-800 object-cover"
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

export default ProgramGallery;
