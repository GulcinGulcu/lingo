export const ChatLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <span className="loading loading-ring loading-lg"></span>
      <span className="font-semibold font-mono">Connecting to chat...</span>
    </div>
  );
};
