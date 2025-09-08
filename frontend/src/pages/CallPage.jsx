import { useNavigate, useParams } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { getStreamToken } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { PageLoader } from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const CallPage = () => {
  const { id: callId } = useParams();
  const { authUser, isLoading } = useAuthUser();

  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!callId || !authUser || !tokenData.token) return;

      try {
        console.log("Initializing video call...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        console.log("Joined call");

        setCall(callInstance);
        setClient(videoClient);
      } catch (error) {
        console.log("Error in initializing the call", error);
        toast.error("Failed to join the call, please try again.");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [callId, authUser, tokenData]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {call && client ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <p>Could not initialize the call, try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};
