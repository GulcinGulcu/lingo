import { VideoCallButton } from "../../icons/VideoCallIcon";

export const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="border-b w-full p-3 flex items-center justify-end absolute top-0 mx-auto">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-white px-5 mr-4"
      >
        <VideoCallButton />
      </button>
    </div>
  );
};
