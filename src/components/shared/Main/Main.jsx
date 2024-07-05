import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import LeftMenu from "../LeftMenu/LeftMenu";

const Main = () => {
  return (
    <section className="h-screen flex flex-col justify-between  ">
      <Header />

      <main
        className="flex-1 flex bg-[#121a2d] box-border "
 
      >
        <LeftMenu />
        <Outlet />
      </main>
    </section>
  );
};

export default Main;
