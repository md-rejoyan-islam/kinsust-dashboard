import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/shared/header/Header";
import LeftMenu from "../components/shared/leftMenu/LeftMenu";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <section className="h-[calc(100vh-3px)] flex flex-col justify-between">
      <Header setOpenDrawer={setOpenDrawer} />

      <main className="flex-1 flex bg-[#121a2d] h-[calc(100vh-65px)] lg:h-[calc(100vh-81px)]">
        <LeftMenu openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <div className="overflow-auto w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default Layout;
