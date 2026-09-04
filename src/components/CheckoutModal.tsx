import { useState } from "react";
import type { Plan } from "../types";
import { PAY_CARDS } from "../data/plans";
import { copyText, formatSom } from "../utils";

interface CheckoutModalProps {
  plan: Plan;
  onToast: (msg: string) => void;
  onClose: () => void;
}

export default function CheckoutModal({ plan, onToast, onClose }: CheckoutModalProps) {
  const [consent, setConsent] = useState(false);

  const priceLabel =
    plan.price === null
      ? "Miqdorni o'zingiz belgilaysiz — evaziga hech narsa"
      : `${formatSom(plan.price)} so'm${plan.per} evaziga hech narsa`;

  const payInstruction =
    plan.price === null
      ? "Nusxalagach, xohlagan miqdorni o'tkazing."
      : `Nusxalagach, aynan ${formatSom(plan.price)} so'm${plan.per} o'tkazing.`;

  function handleTransfer(cardNumber: string, label: string) {
    copyText(cardNumber).catch(() => {});
    onToast(`${label} raqami nusxalandi — pul o'tkazishga tayyor`);
  }

  return (
    <div className="overlay open">
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <div className="sheet-head">
          <h3 id="checkoutTitle" className="serif">
            {plan.name} tarifi
          </h3>
          <button className="close" aria-label="Yopish" onClick={onClose}>
            &times;
          </button>
        </div>

        {!consent ? (
          <div className="consent-gate">
            <p className="consent-badge mono">Kichkina bir chin gap</p>
            <p className="consent-text">
              Ochig'ini aytsak: <strong>{priceLabel.split(" evaziga")[0]}</strong> to'lasangiz, sizga hech
              narsa yubormaymiz — mahsulot ham, xizmat ham yo'q, faqat shu qiziq sahifaning o'zi bor. Buni
              faqat kayfiyat va hazil uchun qilamiz, xohlasangiz davom eting, xohlasangiz shu yerda to'xtang.
            </p>
            <label className="consent-switch">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span className="track" aria-hidden="true">
                <span className="thumb" />
              </span>
              <span className="consent-label">Xo'p, baribir davom etaman — chunki yoqib qoldi</span>
            </label>
          </div>
        ) : (
          <>
            <p className="selected-price mono">{priceLabel}</p>

            {PAY_CARDS.map((card) => (
              <div className="pay-row" key={card.label}>
                <div className="pay-top">
                  <span className="pay-label mono">{card.label}</span>
                  <span className="pay-holder">{card.holder}</span>
                </div>
                <span className="pay-number mono">{card.displayNumber}</span>
                <button className="pay-btn" onClick={() => handleTransfer(card.number, card.label)}>
                  Pul o'tkazish
                </button>
              </div>
            ))}

            <p className="disclaimer">{payInstruction} Yodda tuting — bu yerda haqiqiy mahsulot yo'q, sof kayfiyat uchun.</p>
          </>
        )}
      </div>
    </div>
  );
}
