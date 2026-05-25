import { createFileRoute } from "@tanstack/react-router";
import { Carousel } from "@/components/Carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "collapse" },
      { name: "description", content: "keno — java developer, c++ & c#" },
      { property: "og:title", content: "collapse" },
      { property: "og:description", content: "keno — java developer, c++ & c#" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Carousel />;
}
