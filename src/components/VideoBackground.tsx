import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import bgVideo from "@/assets/bg-video.mp4";

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  // Try unmuted autoplay; browsers may block and force mute fallback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });

    // On first user interaction, attempt to unmute if still muted.
    const tryUnmute = () => {
      if (v.muted) {
        v.muted = false;
        v.play()
          .then(() => setMuted(false))
          .catch(() => {});
      }
      window.removeEventListener("pointerdown", tryUnmute);
      window.removeEventListener("keydown", tryUnmute);
    };
    window.addEventListener("pointerdown", tryUnmute);
    window.addEventListener("keydown", tryUnmute);
    return () => {
      window.removeEventListener("pointerdown", tryUnmute);
      window.removeEventListener("keydown", tryUnmute);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={bgVideo}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute" : "Mute"}
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur transition hover:text-white"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </>
  );
}
