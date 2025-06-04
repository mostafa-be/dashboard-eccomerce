import { Metadata } from "next";

import HomePage from "../components/Home/HomePage";

export const metadata: Metadata = {
  title: "Nextora | E-commerce Platform for Modern Startups",
  description:
    "Launch and scale your online business with Nextora's powerful e-commerce platform. Easy setup, powerful analytics, and seamless payments.",
  keywords: "ecommerce platform, online store, startup, sell online, nextora",
};

export default function Home() {
  return (
    <HomePage/>

  );
}
