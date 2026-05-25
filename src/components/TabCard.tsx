import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type CardButton = {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
};

interface TabCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: ReactNode;
  buttons: CardButton[];
  showReturn?: boolean;
}

export function TabCard({ image, imageAlt, title, subtitle, buttons, showReturn = true }: TabCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, rotateY: -8 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.96, rotateY: 8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen items-center justify-center px-6"
      style={{ perspective: 1200 }}
    >
      {showReturn && (
        <Link
          to="/"
          className="absolute left-6 top-6 font-mono text-sm text-white/80 transition hover:text-white"
        >
          ← return
        </Link>
      )}

      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
        <img
          src={image}
          alt={imageAlt}
          className="h-[380px] w-[280px] object-cover shadow-2xl"
        />

        <div className="max-w-md text-center md:text-left">
          <h1 className="font-serif text-5xl text-white">{title}</h1>
          <p className="mt-2 font-serif italic text-white/70">{subtitle}</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {buttons.map((b) => {
              const className =
                "inline-flex items-center justify-center border border-white/30 bg-black/30 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition hover:bg-white hover:text-black";
              if (b.to) {
                return (
                  <Link key={b.label} to={b.to} className={className}>
                    {b.label}
                  </Link>
                );
              }
              return (
                <a
                  key={b.label}
                  href={b.href}
                  target={b.external ? "_blank" : undefined}
                  rel={b.external ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {b.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
