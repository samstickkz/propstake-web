import React, { useEffect, useRef } from "react";

interface VideoProps {
  src: string;
  poster?: string; // Optional poster image
  className?: string; // Optional className for styling
}

const Video: React.FC<VideoProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Ensure video is muted for autoplay to work across most browsers
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        playPromise.catch((error) => {
          console.log("Autoplay prevented, attempting to play again.");
        });
      }
    }
  }, []);
  return (
    <div className={`video-container ${className}`}>
      <video
        loop
        ref={videoRef}
        autoPlay
        muted
        playsInline
        poster={poster} // Optional poster for the video before play
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
