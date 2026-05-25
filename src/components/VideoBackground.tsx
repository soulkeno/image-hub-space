import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import bgVideo from "@/assets/bg-video.mp4";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) {
      v.play().catch(() => {});
    }
  }, [muted]);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={bgVideo}
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute background audio" : "Mute background audio"}
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur transition hover:text-white"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </>
  );
}
