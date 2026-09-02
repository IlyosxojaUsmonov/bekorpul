import { useEffect, useState } from "react";
import type { Plan } from "./types";
import { PLANS } from "./data/plans";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";

const CHECKOUT_KEY = "bekorpul_checkout_plan";

function restoreCheckoutPlan(): Plan | null {
  try {
    const savedId = localStorage.getItem(CHECKOUT_KEY);
    return savedId ? PLANS.find((p) => p.id === savedId) ?? null : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(restoreCheckoutPlan);
  const { message, showToast } = useToast();

  // Sahifa yangilansa (refresh) ham oyna ochiq qolishi uchun tanlangan
  // tarifni saqlab qo'yamiz. Oyna faqat tasdiqlash so'rovlari zanjiridan
  // (CheckoutModal ichida) o'tilgach yopiladi — shundagina kalit tozalanadi.
  useEffect(() => {
    try {
      if (checkoutPlan) localStorage.setItem(CHECKOUT_KEY, checkoutPlan.id);
      else localStorage.removeItem(CHECKOUT_KEY);
    } catch {
      // localStorage mavjud emas — refresh'da oyna tiklanmaydi, lekin sahifa ishlayveradi
    }
  }, [checkoutPlan]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSelectPlan(plan: Plan) {
    if (plan.free) {
      showToast("Tabriklaymiz! Sizda allaqachon hech narsa bor. Hisobingiz faollashtirildi.");
      return;
    }
    setCheckoutPlan(plan);
  }

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero onScrollTo={scrollTo} />
      <Features />
      <Pricing onSelectPlan={handleSelectPlan} />
      <Faq />
      <Footer onJoke={showToast} />

      {checkoutPlan && (
        <CheckoutModal plan={checkoutPlan} onToast={showToast} onClose={() => setCheckoutPlan(null)} />
      )}

      <Toast message={message} />
    </>
  );
}
