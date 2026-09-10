import { useEffect, useState } from "react";
import type { Plan, GiftInfo } from "./types";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CheckoutModal from "./components/CheckoutModal";
import Products from "./components/Products";
import { GIFT_PLAN } from "./data/plans";
import { useToast } from "./hooks/useToast";
import { consumePendingCertificate, generateCertificate } from "./lib/certificate";

export default function App() {
  const { message, showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [giftInfo, setGiftInfo] = useState<GiftInfo | null>(null);

  // Payme'dan qaytgandan so'ng — to'lovga ketishdan oldin saqlangan sertifikat bo'lsa, shuni chiqarib beramiz.
  useEffect(() => {
    const pending = consumePendingCertificate();
    if (pending) {
      generateCertificate(pending);
      showToast("Xush kelibsiz! Sertifikatingiz PDF sifatida yuklab olindi.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <Features />
      <Products />
      <Faq />
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
