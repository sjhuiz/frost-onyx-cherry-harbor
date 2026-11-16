import { createFileRoute } from "@tanstack/react-router";
import { DrossApp } from "@/components/dross-app";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <DrossApp />;
}
