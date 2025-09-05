import { NotificationIcon } from "../../icons/NotificationIcon";

export const NoNotifications = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center py-16">
      <div className="size-14 rounded-full bg-base-300 flex justify-center items-center mb-6">
        <NotificationIcon className="text-base-content opacity-70" />
      </div>
      <h3 className="text-lg font-semibold mb-1">No notifications yet</h3>
      <p className="text-base-content opacity-50 max-w-lg">
        When you get friend requests or message, they will appear here
      </p>
    </div>
  );
};
