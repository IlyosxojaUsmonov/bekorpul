import { useState } from "react";
import type { Plan } from "../types";
import { formatSom } from "../utils";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  async function startPayment() {
    setIsStartingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: plan.id }),
      });
      const result = (await response.json()) as {
        pay_url?: string;
        error?: string;
      };

      if (!response.ok || !result.pay_url) {
        throw new Error(result.error || "To'lovni boshlash imkoni bo'lmadi.");
      }

      window.location.href = result.pay_url;
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "To'lovni boshlash imkoni bo'lmadi.",
      );
      setIsStartingPayment(false);
    }
  }

  return (
    <div className={"plan" + (plan.popular ? " featured" : "")}>
      {plan.popular && <span className="pop">ENG MASHHUR</span>}
      <h3>{plan.name}</h3>
      <div className="amount serif">
        {plan.price === null ? (
          <>
            O'zingiz<span className="per"> belgilaysiz</span>
          </>
        ) : (
          <>
            {plan.price === 0 ? "0" : formatSom(plan.price)}
            <span className="per"> so'm{plan.per}</span>
          </>
        )}
      </div>
      <p className="desc">{plan.desc}</p>
      <ul>
        {plan.feats.map((f) => (
          <li key={f}>
            <span className="check">&#10003;</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        className="cta"
        type="button"
        onClick={startPayment}
        disabled={isStartingPayment}
      >
        {isStartingPayment
          ? "Yuklanmoqda..."
          : plan.free
            ? "Bepul boshlash"
            : "Tanlash"}
      </button>
      {paymentError && (
        <p className="field-error" role="alert">
          {paymentError}
        </p>
      )}
    </div>
  );
}
