import { Link, useLocation } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import Logo from "../../icons/Logo";
import { HomeIcon } from "../../icons/HomeIcon";
import { FriendsIcon } from "../../icons/FriendsIcon";
import { NotificationIcon } from "../../icons/NotificationIcon";

export const SideBar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-base-200 h-screen shadow-lg hidden lg:flex flex-col sticky top-0">
      <div className="mb-4 p-5">
        <Link to={"/"} className="flex items-center justify-start gap-2">
          <Logo className="text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Lingo
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to={"/"}
          className={`btn btn-ghost justify-start gap-2 w-full ${
            pathname === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to={"/friends"}
          className={`btn btn-ghost justify-start gap-2 w-full ${
            pathname === "/friends" ? "btn-active" : ""
          }`}
        >
          <FriendsIcon className="text-base-content opacity-70" />
          <span>Friends</span>
        </Link>
        <Link
          to={"/notifications"}
          className={`btn btn-ghost justify-start gap-2 w-full ${
            pathname === "/notifications" ? "btn-active" : ""
          }`}
        >
          <NotificationIcon className="text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <div className="divider"></div>
        <div className="flex items-center gap-3 px-4 pb-4">
          <div className="avatar">
            <div className="rounded-full w-10">
              <img src={authUser?.profilePic} alt="User profile" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-sm text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success "></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
