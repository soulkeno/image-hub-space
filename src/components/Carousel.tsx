import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useMotionValue, animate } from "framer-motion";
import pfp from "@/assets/pfp.png";

type Card = {
  id: string;
  title: string;
  to: "/about" | "/socials" | "/contact";
  image: string;
};

const CARDS: Card[] = [
  { id: "about", title: "about", to: "/about", image: pfp },
  { id: "socials", title: "socials", to: "/socials", image: pfp },
  { id: "contact", title: "contact", to: "/contact", image: pfp },
];

const RADIUS = 360;
const STEP = 360 / CARDS.length;

export function Carousel() {
  const navigate = useNavigate();
  const rotation = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef(0);
  const rotStart = useRef(0);

  const snapTo = (index: number) => {
    const target = -index * STEP;
    animate(rotation, target, { type: "spring", stiffness: 120, damping: 20 });
    setActiveIndex(((index % CARDS.length) + CARDS.length) % CARDS.length);
  };

  useEffect(() => {
    snapTo(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") snapTo(activeIndex + 1);
      if (e.key === "ArrowLeft") snapTo(activeIndex - 1);
      if (e.key === "Enter") navigate({ to: CARDS[((activeIndex % CARDS.length) + CARDS.length) % CARDS.length].to });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div
        className="relative h-[480px] w-full select-none"
        style={{ perspective: 1400 }}
        onPointerDown={(e) => {
          dragStart.current = e.clientX;
          rotStart.current = rotation.get();
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          const delta = (e.clientX - dragStart.current) * 0.4;
          rotation.set(rotStart.current + delta);
        }}
        onPointerUp={() => {
          const current = rotation.get();
          const nearest = Math.round(-current / STEP);
          snapTo(nearest);
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotation,
          }}
        >
          {CARDS.map((card, i) => (
            <CarouselCard
              key={card.id}
              card={card}
              angle={i * STEP}
              onEnter={() => navigate({ to: card.to })}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex gap-2 font-mono text-xs uppercase tracking-widest text-white/60">
        {CARDS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => snapTo(i)}
            className={`px-2 py-1 transition ${
              i === activeIndex ? "text-white" : "hover:text-white/80"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        drag to spin · enter to open
      </p>
    </div>
  );
}

function CarouselCard({
  card,
  angle,
  onEnter,
}: {
  card: Card;
  angle: number;
  onEnter: () => void;
}) {
  return (
    <div
      className="absolute"
      style={{
        width: 220,
        height: 320,
        left: -110,
        top: -160,
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex h-full w-full flex-col items-center">
        <img
          src={card.image}
          alt={card.title}
          className="h-[260px] w-full object-cover shadow-2xl"
          draggable={false}
        />
        <div className="mt-3 font-serif text-xl text-white">{card.title}</div>
        <button
          type="button"
          onClick={onEnter}
          className="mt-2 border border-white/40 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white transition hover:bg-white hover:text-black"
        >
          enter
        </button>
      </div>
    </div>
  );
}
