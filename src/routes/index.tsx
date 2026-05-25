import { createFileRoute } from "@tanstack/react-router";
import { TabCard } from "@/components/TabCard";
import pfp from "@/assets/pfp.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "keno — portfolio" },
      { name: "description", content: "Java developer, also working with C++ & C#." },
      { property: "og:title", content: "keno — portfolio" },
      { property: "og:description", content: "Java developer, also working with C++ & C#." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <TabCard
      image={pfp}
      imageAlt="keno"
      title="keno"
      subtitle="Java Developer, also working with C++ & C#"
      showReturn={false}
      buttons={[
        { label: "Socials", to: "/socials" },
        { label: "Contact", to: "/contact" },
      ]}
    />
  );
}
