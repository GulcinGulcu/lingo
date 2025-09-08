import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../lib/api";
import { Link } from "react-router";
import { FriendsIcon } from "../../icons/FriendsIcon";
import { NoFriendsCard } from "../components/NoFriendsCard";
import { FriendCard } from "../components/FriendCard";

export const FriendsPage = () => {
  const { data: friends = [], isLoading: isLoadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to={"/notifications"}>
            <button className="btn btn-outline flex gap-2 btn-sm">
              <FriendsIcon className="text-base-content opacity-70" />
              <span>Friend Requests</span>
            </button>
          </Link>
        </div>
        {isLoadingFriends ? (
          <div className="flex justify-between py-6">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
