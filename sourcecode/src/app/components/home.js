"use client";
import { ParallaxProvider } from "react-scroll-parallax";
import { Backdrop } from "./backdrop";
import "./styles.css";

export default function HomePage() {
  return (
    <ParallaxProvider>
        <Backdrop />
    </ParallaxProvider>

  );
}