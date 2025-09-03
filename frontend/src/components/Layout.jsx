import { SideBar } from "./SideBar";
import { Navbar } from "./Navbar";

export const Layout = ({ showSideBar = false, children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSideBar && <SideBar />}

        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
