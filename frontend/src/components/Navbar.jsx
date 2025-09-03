import { useAuthUser } from "../hooks/useAuthUser";
import { useLocation } from "react-router";
import { Link } from "react-router";
import Logo from "../../icons/Logo";
import { NotificationIcon } from "../../icons/NotificationIcon";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { LogoutIcon } from "../../icons/LogoutIcon";

export const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return (
    <nav className="shadow-lg bg-base-200 sticky top-0 flex items-center h-16">
      <div className="container px-4">
        <div className="flex items-center justify-end w-full">
          {isChatPage && (
            <div className="mb-4 p-5">
              <Link to={"/"} className="flex items-center justify-start gap-2">
                <Logo />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Lingo
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-1 px-4">
            <Link
              to={"/notification"}
              className={`btn btn-ghost btn-circle ${
                location.pathname === "/notification" ? "btn-active" : ""
              }`}
            >
              <NotificationIcon className="text-base-content opacity-70" />
            </Link>
            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
            >
              <LogoutIcon className="text-base-content opacity-70" />
            </button>
            <div className="avatar">
              <div className="rounded-full w-10">
                <img src={authUser?.profilePic} alt="User profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
