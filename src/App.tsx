import { useEffect, useState } from "react";
import type { Plan, GiftInfo } from "./types";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CheckoutModal from "./components/CheckoutModal";
import Products from "./components/Products";
import { GIFT_PLAN } from "./data/plans";
import { useToast } from "./hooks/useToast";
import {
  consumePendingCertificate,
  generateCertificate,
} from "./lib/certificate";

export default function App() {
  const { message, showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [giftInfo, setGiftInfo] = useState<GiftInfo | null>(null);

  function downloadPendingCertificate() {
    const pending = consumePendingCertificate();
    if (!pending) return;

    generateCertificate(pending);
    showToast("Xush kelibsiz! Sertifikatingiz PDF sifatida yuklab olindi.");
  }

  // Payme yangi tabda ochiladi; foydalanuvchi shu sahifaga qaytganda saqlangan sertifikatni chiqaramiz.
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

  function handleSelectPlan(plan: Plan) {
    setGiftInfo(null);
    setSelectedPlan(plan);
  }

  function handleGift(info: GiftInfo) {
    setGiftInfo(info);
    setSelectedPlan(GIFT_PLAN);
  }

  function handleCloseCheckout() {
    setSelectedPlan(null);
    setGiftInfo(null);
  }

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero onScrollTo={scrollTo} />
      <Pricing onSelectPlan={handleSelectPlan} onGift={handleGift} />
      <Products />
      <Footer onJoke={showToast} onScrollTo={scrollTo} />

      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          giftInfo={giftInfo ?? undefined}
          onToast={showToast}
          onClose={handleCloseCheckout}
        />
      )}

      <Toast message={message} />
    </>
  );
}
