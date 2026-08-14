import type { Metadata } from "next";
import LandingPage from "./landing-page";

const description =
  "Permanent capital for a small number of Mexican businesses.";

export const metadata: Metadata = {
  title: "Saicere Holdings",
  description,
  openGraph: {
    title: "Saicere Holdings",
    description,
  },
};

export default function Page() {
  return <LandingPage />;
}
