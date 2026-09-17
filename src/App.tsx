import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Products from "./components/Products";
import { useToast } from "./hooks/useToast";
import {
  consumePendingCertificate,
  generateCertificate,
} from "./lib/certificate";

export default function App() {
  const { message, showToast } = useToast();

  function downloadPendingCertificate() {
    const pending = consumePendingCertificate();
    if (!pending) return;

    generateCertificate(pending);
    showToast("Xush kelibsiz! Sertifikatingiz PDF sifatida yuklab olindi.");
  }

  useEffect(() => {
    downloadPendingCertificate();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") downloadPendingCertificate();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", downloadPendingCertificate);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", downloadPendingCertificate);
    };
  }, []);

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero onScrollTo={scrollTo} />
      <Pricing />
      <Products />
      <Footer onJoke={showToast} onScrollTo={scrollTo} />

      <Toast message={message} />
    </>
  );
}
