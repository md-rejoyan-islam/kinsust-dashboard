import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPostPhoto } from "../../../features/gellery/gelleryApiSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../../../components/Loading";

const PostGallery = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.gellery);

  useEffect(() => {
    dispatch(allPostPhoto());
  }, [dispatch]);

  if (loading) return <Loading />;
  return (
    <section className="w-full p-4 bg-[#121a2d]">
      <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
        All Post folder images
      </h1>
      <hr className="h-[1px] bg-zinc-800 w-full border-none" />
      <div className=" py-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
        {posts?.map((image, index) => (
          <div key={index} className="relative">
            <figure className="cursor-pointer">
              <PhotoProvider>
                <PhotoView
                  src={`${
                    import.meta.env.VITE_SERVER_URL + "/public/images/posts/"
                  }/${image}`}
                >
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL + "/public/images/posts/"
                    }/${image}`}
                    alt=""
                    className="rounded-md w w-full h-[250px]  border-4 border-zinc-800 object-cover"
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

export default PostGallery;
