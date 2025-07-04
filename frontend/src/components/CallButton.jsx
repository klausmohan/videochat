import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-0 inset-x-0 z-20 bg-base-100/80 backdrop-blur-md border-b border-base-300 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        <button
          onClick={handleVideoCall}
          className="btn btn-success btn-sm text-white gap-2 shadow-sm hover:scale-105 transition-transform"
        >
          <VideoIcon className="size-5" />
          <span className="hidden sm:inline">Start Call</span>
        </button>
      </div>
    </div>
  );
}

export default CallButton;
