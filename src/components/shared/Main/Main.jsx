import { Outlet } from "react-router-dom";
import LeftMenu from "../leftMenu/LeftMenu";
import Header from "../header/Header";

const Main = () => {
  return (
    <section className="h-screen flex flex-col justify-between  ">
      <Header />
      <main className="flex-1 flex bg-[#121a2d] box-border ">
        <LeftMenu />
        <Outlet />
      </main>
    </section>
  );
};

export default Main;
