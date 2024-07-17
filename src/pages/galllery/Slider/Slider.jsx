import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ShowToast from "../../../components/toast/Toast";

const Slider = () => {
  // change deteck
  const [change, setChange] = useState(false);
  const [images, setImages] = useState([]);

  const handleDelete = async (name) => {
    try {
      axios
        .delete(`https://backend-kin.onrender.com/api/v1/images/slider/${name}`)
        .then((res) => {
          ShowToast("success", "Successfully Deleted");
          change ? setChange(false) : setChange(true);
          console.log(res.data);
        })
        .catch(() => {});
    } catch (error) {
      console.log(error);
    }
  };

  //fetch advisors data
  useEffect(() => {
    axios
      .get("https://backend-kin.onrender.com/api/v1/images/slider")
      .then((res) => {
        setImages(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [change]);

  return (
    <section className="w-full p-4 bg-[#121a2d]">
      <h1 className=" pb-4 text-center font-bold text-xl text-[#38bdf8]">
        All Advisors folder images
      </h1>
      <hr className="h-[1px] bg-zinc-700 w-full border-none" />
      <div className=" p-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <button
              onClick={(id) => {
                handleDelete(id);
              }}
            >
              <figure className="relative">
                <img
                  src={`https://backend-kin.onrender.com/public/images/slider/${image}`}
                  alt=""
                  className="rounded-md w-full h-full border-4 border-zinc-800 object-cover"
                />
                <button
                  className="absolute w-8 h-8 bg-[#f154157d] flex justify-center items-center font-bold top-2 right-5 hover:bg-red-700   rounded-md text-lg text-white"
                  onClick={() => {
                    handleDelete(image);
                  }}
                >
                  <MdDelete className="w-6 h-6 " />
                </button>
              </figure>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;
