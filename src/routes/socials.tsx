import { createFileRoute } from "@tanstack/react-router";
import { TabCard } from "@/components/TabCard";
import pfp from "@/assets/pfp.png";

export const Route = createFileRoute("/socials")({
  head: () => ({
    meta: [
      { title: "socials — collapse" },
      { name: "description", content: "Find collapse on Discord and TikTok." },
      { property: "og:title", content: "socials — collapse" },
      { property: "og:description", content: "Find collapse on Discord and TikTok." },
    ],
  }),
  component: Socials,
});

function Socials() {
  return (
    <TabCard
      image={pfp}
      imageAlt="collapse"
      title="socials"
      subtitle="find me around the internet"
      buttons={[
        {
          label: "Discord",
          href: "https://discord.com/users/1432773324143988747",
          external: true,
        },
        {
          label: "TikTok",
          href: "https://www.tiktok.com/@wbu5s",
          external: true,
        },
      ]}
    />
  );
}
