import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  getRecommendedUsers,
  getOutgoingFriendRequests,
  sendFriendRequest,
  getFriends,
} from "../lib/api";
import { Link } from "react-router";
import { FriendsIcon } from "../../icons/FriendsIcon";
import { FriendCard } from "../components/FriendCard";
import { NoFriendsCard } from "../components/NoFriendsCard";
import { useEffect, useState } from "react";
import LocationIcon from "../../icons/LocationIcon";
import { getLanguageFlag } from "../components/FriendCard";
import { ClockIcon } from "../../icons/ClockIcon";
import { AddFriendIcon } from "../../icons/AddFriendIcon";
import toast from "react-hot-toast";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingFriendRequestsIds, setOutgoingFriendRequestsIds] = useState(
    new Set()
  );

  const { data: friends = [], isLoading: isLoadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const { data: recommendedUsers = [], isLoading: isLoadingRecommendedUsers } =
    useQuery({
      queryKey: ["recommendedUsers"],
      queryFn: getRecommendedUsers,
    });

  const { data: outgoingFriendRequests, isLoading } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: getOutgoingFriendRequests,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequests"] }),
    onError: (error) => toast.error(error.response.data.message)
  });

  useEffect(() => {
    const outgoindReqIds = new Set();

    if (outgoingFriendRequests && outgoingFriendRequests.length > 0) {
      outgoingFriendRequests.forEach((req) => {
        outgoindReqIds.add(req.recipient._id);
      });
      setOutgoingFriendRequestsIds(outgoindReqIds);
    }
  }, [outgoingFriendRequests]);

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
        <section className="space-y-4">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Meet New Friends
            </h2>
            <p className="text-base-content opacity-70">
              Discover new language partners based on your profile
            </p>
          </div>
          {isLoadingRecommendedUsers ? (
            <div className="flex justify-between py-6">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-300 text-center p-6 font-semibold">
              <h3 className="text-md sm:text-lg mb-2">
                No recommendation available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later again!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingFriendRequestsIds.has(
                  user._id
                );
                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="card-body p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="avatar rounded-full size-12">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>
                        <div>
                          <h3 className="font-semibold truncate text-lg ">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1 gap-1">
                              <LocationIcon className="text-base-content opacity-70" />
                              <span>{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <span className="badge badge-secondary text-sm">
                          <span>
                            {getLanguageFlag(user.nativeLanguage)} Native:{" "}
                            {capitalize(user.nativeLanguage)}
                          </span>
                        </span>
                        <span className="badge badge-outline text-sm">
                          <span>
                            {getLanguageFlag(user.learningLanguage)} Learning:{" "}
                            {capitalize(user.learningLanguage)}
                          </span>
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isLoading}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <ClockIcon className="text-base-content opacity-70" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <AddFriendIcon className="text-base-content opacity-70" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default HomePage;
