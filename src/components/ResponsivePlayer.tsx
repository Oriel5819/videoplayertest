import React from "react";
import ReactPlayer from "react-player";

interface responsivePlayerProps {
  url: string;
  onprogress: (state: any) => void;
  onplaying: boolean;
  onplay: () => void;
  onpause: () => void;
  onended: () => void;
}

const ResponsivePlayer = ({
  url,
  onprogress,
  onplaying,
  onplay,
  onpause,
  onended,
}: responsivePlayerProps) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        controls
        url={url}
        width="100%"
        height="100%"
        onProgress={onprogress}
        playing={onplaying}
        onPlay={onplay}
        onPause={onpause}
        onEnded={onended}
      />
    </div>
  );
};

export default ResponsivePlayer;
