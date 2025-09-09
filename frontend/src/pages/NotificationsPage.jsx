import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";
import { acceptFriendRequest } from "../lib/api";
import { FriendsIcon } from "../../icons/FriendsIcon";
import { getLanguageFlag } from "../components/FriendCard";
import { capitalize } from "./HomePage";
import { NotificationIcon } from "../../icons/NotificationIcon";
import { ClockIcon } from "../../icons/ClockIcon";
import { NoNotifications } from "../components/NoNotifications";


export const NotificationPage = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptReqMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const incomingReqs = friendRequests?.incomingRequests || [];
  const acceptedReqs = friendRequests?.acceptedRequests || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-5">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-5">
          Notifications
        </h1>
        {isLoading ? (
          <div className="flex justify-between py-6">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingReqs.length > 0 && (
              <section className="space-y-4">
                <div className="flex flex-col items-start gap-3">
                  <h2 className="flex items-center text-lg font-semibold">
                    <FriendsIcon className="text-primary opacity-70 mr-2" />
                    Friend Requests
                    <span className="badge badge-primary ml-5">
                      {incomingReqs.length}
                    </span>
                  </h2>
                  {incomingReqs.map((req) => (
                    <div
                      key={req._id}
                      className="card bg-base-300 p-4 w-full font-semibold"
                    >
                      <div className="card-body p-2">
                        <div className="flex items-center gap-6">
                          <div className="avatar rounded-full size-14">
                            <img
                              src={req.sender.profilePic}
                              alt={req.sender.fullName}
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">
                              {req.sender.fullName}
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                              <span className="badge badge-secondary text-sm">
                                <span>
                                  {getLanguageFlag(req.sender.nativeLanguage)}{" "}
                                  Native:{" "}
                                  {capitalize(req.sender.nativeLanguage)}
                                </span>
                              </span>
                              <span className="badge badge-outline text-sm">
                                <span>
                                  {getLanguageFlag(req.sender.learningLanguage)}{" "}
                                  Learning:{" "}
                                  {capitalize(req.sender.learningLanguage)}
                                </span>
                              </span>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-sm"
                            disabled={isPending}
                            onClick={() => acceptReqMutation(req._id)}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {acceptedReqs.length > 0 && (
              <section className="space-y-4">
                <div className="flex flex-col items-start gap-3">
                  <h2 className="flex items-center text-lg font-semibold">
                    <NotificationIcon className="text-primary opacity-70 mr-2" />
                    New Connections
                  </h2>
                  {acceptedReqs.map((req) => (
                    <div
                      key={req._id}
                      className="card bg-base-300 p-4 w-full font-semibold"
                    >
                      <div className="card-body p-2">
                        <div className="flex items-center gap-6">
                          <div className="avatar rounded-full size-14">
                            <img
                              src={req.recipient.profilePic}
                              alt={req.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">
                              {req.recipient.fullName}
                            </h3>
                            <p className="text-sm">
                              {capitalize(req.recipient.fullName)} accepted your
                              friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70 gap-1">
                              <ClockIcon />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-outline self-start">
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        {incomingReqs.length === 0 && acceptedReqs.length === 0 && !isLoading && (
          <NoNotifications />
        )}
      </div>
    </div>
  );
};
