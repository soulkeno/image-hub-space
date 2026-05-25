import { createFileRoute } from "@tanstack/react-router";
import { TabCard } from "@/components/TabCard";
import pfp from "@/assets/pfp.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — keno" },
      { name: "description", content: "Java developer, also working with C++ & C#." },
      { property: "og:title", content: "about — keno" },
      { property: "og:description", content: "Java developer, also working with C++ & C#." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <TabCard
      image={pfp}
      imageAlt="collapse"
      title="collapse"
      subtitle="Java Developer, also working with C++ & C#"
      buttons={[
        { label: "Socials", to: "/socials" },
        { label: "Contact", to: "/contact" },
      ]}
    />
  );
}
