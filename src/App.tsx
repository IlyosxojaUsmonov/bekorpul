import { useState } from "react";
import type { Plan } from "./types";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CheckoutModal from "./components/CheckoutModal";
import TicketModal from "./components/TicketModal";
import Toast from "./components/Toast";
import { useLocalStats } from "./hooks/useLocalStats";
import { useToast } from "./hooks/useToast";

export default function App() {
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
  const [ticketPlan, setTicketPlan] = useState<Plan | null>(null);
  const { count, sum, recordPurchase } = useLocalStats();
  const { message, showToast } = useToast();

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

  function handlePaid(plan: Plan) {
    recordPurchase(plan.price);
    setCheckoutPlan(null);
    setTicketPlan(plan);
  }

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero onScrollTo={scrollTo} />
      <Features />
      <Pricing onSelectPlan={handleSelectPlan} deviceCount={count} deviceSum={sum} />
      <Faq />
      <Footer onJoke={showToast} />

      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          onToast={showToast}
          onPaid={handlePaid}
        />
      )}
      {ticketPlan && <TicketModal plan={ticketPlan} onClose={() => setTicketPlan(null)} />}

      <Toast message={message} />
    </>
  );
}
