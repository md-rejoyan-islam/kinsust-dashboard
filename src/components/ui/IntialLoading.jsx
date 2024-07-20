import { GridLoader } from "react-spinners";

export default function IntialLoading() {
  return (
    <div className="h-[100vh] w-full grid place-content-center ">
      <GridLoader color="#66bbe3" margin={10} size={20} />
    </div>
  );
}
