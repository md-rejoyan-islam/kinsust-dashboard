import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addEc } from "../../../features/ec/ecApiSlice";

const AddEc = () => {
  const dispatch = useDispatch();

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const data = Object.fromEntries(newForm.entries());
    const { name, year } = data;
    if (!name || !year) {
      return toast.error("Please fill all the fields");
    }

    const response = await dispatch(addEc(data));
    console.log(response);
    if (response?.payload?.success) {
      e.target.reset();
    }
  };

  return (
    <>
      <section className="sm:w-[500px] mx-auto h-fit px-4 py-10  text-[#33bdf8]  mt-5 mb-10">
        <div className="p-5 bg-[#1e293bd6] rounded-md">
          <h1 className="text-xl font-bold text-center pb-3">
            Add Committee Data
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6 w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white"
              >
                Enter EC Committee Name
              </label>
              <input
                type="text"
                name="name"
                className=" bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example : 17th executive committee"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-[#91a3b8] dark:text-white">
                Committee Year
              </label>
              <input
                type="text"
                name="year"
                className="bg-gray-900 border border-gray-700 text-[#91a3b8] text-sm rounded-lg focus:ring-0 focus:border-zinc-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Example : 2022"
              />
            </div>

            <div className="w-full">
              <button
                type="submit"
                className=" text-[#ffffff] font-bold bg-[#259af8] hover:bg-blue-800  focus:outline-none focus:ring-0  rounded-lg text-sm  w-full px-5 py-2.5 text-center "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddEc;
