import { createFileRoute } from "@tanstack/react-router";
import { TabCard } from "@/components/TabCard";
import pfp from "@/assets/pfp.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contact — collapse" },
      { name: "description", content: "Get in touch with collapse via email or Discord." },
      { property: "og:title", content: "contact — collapse" },
      { property: "og:description", content: "Get in touch with collapse via email or Discord." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <TabCard
      image={pfp}
      imageAlt="collapse"
      title="contact"
      subtitle="reach out, i don't bite"
      buttons={[
        { label: "Email", href: "mailto:collapsestreaming@gmail.com" },
        {
          label: "Discord",
          href: "https://discord.com/users/1432773324143988747",
          external: true,
        },
      ]}
    />
  );
}
