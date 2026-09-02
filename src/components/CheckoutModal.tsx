import { useState } from "react";
import type { Plan } from "../types";
import { PAY_APPS, PAY_CARDS } from "../data/plans";
import { copyText, formatSom, openPaymentApp } from "../utils";
import { useReturnDetector } from "../hooks/useReturnDetector";

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
  onToast: (msg: string) => void;
  onPaid: (plan: Plan) => void;
}

export default function CheckoutModal({ plan, onClose, onToast, onPaid }: CheckoutModalProps) {
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const { arm } = useReturnDetector(() => onPaid(plan));

  const priceLabel =
    plan.price === null
      ? "Miqdorni o'zingiz belgilaysiz — evaziga hech narsa"
      : `${formatSom(plan.price)} so'm${plan.per} evaziga hech narsa`;

  async function handleCopy(cardNumber: string, label: string) {
    try {
      await copyText(cardNumber);
      onToast(`${label} raqami nusxalandi ✓`);
      setCopiedCard(cardNumber);
      setTimeout(() => setCopiedCard((c) => (c === cardNumber ? null : c)), 1800);
    } catch {
      onToast(`Nusxalab bo'lmadi — qo'lda kiriting: ${cardNumber}`);
    }
  }

  function handleOpenApp(app: (typeof PAY_APPS)[number]) {
    arm();
    openPaymentApp(app);
  }

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <div className="sheet-head">
          <h3 id="checkoutTitle" className="serif">
            {plan.name} tarifi
          </h3>
          <button className="close" aria-label="Yopish" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="selected-price mono">{priceLabel}</p>

        {PAY_CARDS.map((card) => (
          <div className="pay-row" key={card.label}>
            <div className="pay-top">
              <span className="pay-label mono">{card.label}</span>
              <span className="pay-holder">{card.holder}</span>
            </div>
            <span className="pay-number mono">{card.displayNumber}</span>
            <button
              className={"pay-btn" + (copiedCard === card.number ? " done" : "")}
              onClick={() => handleCopy(card.number, card.label)}
            >
              {copiedCard === card.number ? "Nusxalandi ✓" : "Raqamni nusxalash"}
            </button>
          </div>
        ))}

        <p className="app-label">Nusxalagach, istalgan ilovada to'lang:</p>
        <div className="app-row">
          {PAY_APPS.map((app) => (
            <button key={app.name} className="app-btn" onClick={() => handleOpenApp(app)}>
              {app.name}'ni ochish
            </button>
          ))}
        </div>

        <p className="disclaimer">
          Karta raqami joylashtiriladi &mdash; miqdorni ilovada o'zingiz kiritasiz. To'lab shu oynaga
          qaytsangiz, sertifikat avtomatik chiqadi.
        </p>
      </div>
    </div>
  );
}
