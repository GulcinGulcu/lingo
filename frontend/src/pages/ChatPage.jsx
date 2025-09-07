import { useParams } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
  ChannelList,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { ChatLoader } from "../components/ChatLoader";
import { CallButton } from "../components/CallButton";
import { useNavigate } from "react-router";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CustomChannelPreview = ({ channel, activeChannel }) => {
  const { client } = useChatContext();
  const navigate = useNavigate();

  const isActive = activeChannel?.id === channel.id;

  const me = client.userID || client.user?.id;
  const members = Object.values(channel.state?.members || {});
  const others = members.filter((m) => (m.user?.id ?? m.user_id) !== me);
  const otherUser = others[0]?.user;

  const displayName =
    channel.data?.name ||
    otherUser?.name ||
    otherUser?.id ||
    channel.data?.id ||
    "Direct Message";

  const avatarImage = otherUser?.image;

  const handleClick = () => {
    const otherId = others[0]?.user?.id ?? others[0]?.user_id;
    if (otherId) {
      navigate(`/chat/${otherId}`);
    }
  };

  const unreadCount = channel.countUnread();

  return (
    <button
      onClick={handleClick}
      className={`str-chat__channel-preview-messenger transition-colors flex items-center w-full text-left px-4 py-2 rounded-lg mb-1 font-medium hover:bg-blue-50/80 min-h-9 ${
        isActive
          ? "!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg text-blue-900"
          : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="avatar rounded-full size-12">
          <img src={avatarImage} alt={displayName} />
        </div>
        <div>
          <h3 className="font-semibold truncate text-lg ">{displayName}</h3>
        </div>
        {unreadCount > 0 && (
          <span className="flex items-center justify-center size-5 text-white text-sm rounded-full bg-red-500 ">
            {unreadCount}
          </span>
        )}
      </div>
    </button>
  );
};

export const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [initialChannel, setInitialChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const sort = { last_message_at: -1 };
  const options = { limit: 30 };
  const filters = {
    type: "messaging",
    members: { $in: [authUser._id] },
  };

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!authUser || !tokenData?.token) return;

      try {
        console.log("Initializing chat...");
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [targetUserId, authUser._id].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currChannel.watch();

        setInitialChannel(currChannel);
        setChatClient(client);
      } catch (error) {
        console.log("Error in initializing the chat", error);
        toast.error("Could not connect to chat, please try again");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [authUser, targetUserId, tokenData]);

  if (loading || !chatClient || !initialChannel) return <ChatLoader />;

  const handleVideoCall = () => {
    if (initialChannel) {
      const videoCallUrl = `${window.location.origin}/call/${initialChannel.id}`;

      initialChannel.sendMessage({
        text: `I have started a video call, join here: ${videoCallUrl}`,
      });

      toast.success("Video Call URL has been sent!");
    }
  };

  return (
    <div className="h-[92vh] flex">
      <Chat client={chatClient}>
        <ChannelList
          filters={filters}
          sort={sort}
          options={options}
          Preview={({ channel }) => (
            <CustomChannelPreview
              channel={channel}
              activeChannel={initialChannel}
            />
          )}
        />
        <Channel channel={initialChannel}>
          <Window className="relative w-full overflow-hidden">
            <CallButton handleVideoCall={handleVideoCall} />
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
