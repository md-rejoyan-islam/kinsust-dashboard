import { GridLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-full w-full grid place-content-center ">
      <GridLoader color="#66bbe3" margin={10} size={20} />
    </div>
  );
}
