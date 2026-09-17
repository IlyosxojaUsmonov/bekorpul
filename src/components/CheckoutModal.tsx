import { useState } from "react";
import type { Plan, GiftInfo } from "../types";
import { PAY_CARDS } from "../data/plans";
import { copyText, formatSom } from "../utils";
import { storePendingCertificate } from "../lib/certificate";

// Payme merchant API ulanmaguncha foydalanuvchini Payme'ning umumiy sahifasiga olib boradi.
const PAYME_URL = "https://payme.uz";

interface CheckoutModalProps {
  plan: Plan;
  giftInfo?: GiftInfo;
  onToast: (msg: string) => void;
  onClose: () => void;
}

export default function CheckoutModal({
  plan,
  giftInfo,
  onToast,
  onClose,
}: CheckoutModalProps) {
  const [consent, setConsent] = useState(false);
  const [buyerName, setBuyerName] = useState("");

  const recipientName = giftInfo ? giftInfo.friendName : buyerName.trim();
  const nameReady = giftInfo ? true : recipientName.length > 0;

  const priceLabel =
    plan.price === null
      ? "Miqdorni o'zingiz belgilaysiz — evaziga sarflash"
      : `${formatSom(plan.price)} so'm${plan.per} evaziga sarflash`;

  const payInstruction =
    plan.price === null
      ? "Nusxalagach, xohlagan miqdorni o'tkazing."
      : `Nusxalagach, aynan ${formatSom(plan.price)} so'm${plan.per} o'tkazing.`;

  function handleTransfer(cardNumber: string, label: string) {
    copyText(cardNumber).catch(() => {});
    onToast(`${label} raqami nusxalandi — Payme'ga o'tkazilmoqda...`);

    if (plan.certLevel !== "none" && recipientName) {
      storePendingCertificate({
        recipientName,
        certLevel: plan.certLevel,
        amount: plan.price,
        per: plan.per,
        planName: plan.name,
        giftFrom: giftInfo?.fromName,
        giftTelegram: giftInfo?.friendTelegram,
      });
    }

    const paymeWindow = window.open(PAYME_URL, "_blank", "noopener,noreferrer");
    if (!paymeWindow) {
      window.location.href = PAYME_URL;
    } else {
      paymeWindow.focus();
      onClose();
    }
  }

  return (
    <div className="overlay open">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkoutTitle"
      >
        <div className="sheet-head">
          <h3 id="checkoutTitle" className="serif">
            {giftInfo
              ? `${plan.name} — ${giftInfo.friendName}ga`
              : `${plan.name} tarifi`}
          </h3>
          <button className="close" aria-label="Yopish" onClick={onClose}>
            &times;
          </button>
        </div>

        {!consent ? (
          <div className="consent-gate">
            <p className="consent-badge mono">Kichkina bir chin gap</p>
            <p className="consent-text">
              Ochig'ini aytsak:{" "}
              <strong>{priceLabel.split(" evaziga")[0]}</strong> to'lasangiz,{" "}
              {giftInfo ? `${giftInfo.friendName}ga` : "sizga"} sarflashdan
              boshqasini yubormaymiz — mahsulot ham, xizmat ham yo'q, faqat shu
              qiziq sahifaning o'zi bor. Buni faqat kayfiyat va hazil uchun
              qilamiz, xohlasangiz davom eting, xohlasangiz shu yerda to'xtang.
            </p>

            {!giftInfo && plan.certLevel !== "none" && (
              <label className="field-label consent-name">
                Ismingiz (sertifikat uchun)
                <input
                  className="field"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Ism Familiya"
                />
              </label>
            )}

            <label className="consent-switch">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={!nameReady}
              />
              <span className="track" aria-hidden="true">
                <span className="thumb" />
              </span>
              <span className="consent-label">
                Xo'p, baribir davom etaman — chunki yoqib qoldi
              </span>
            </label>
            {!nameReady && (
              <p className="field-hint">
                Davom etish uchun ismingizni kiriting.
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="selected-price mono">{priceLabel}</p>
            {giftInfo && (
              <p className="gift-note">
                Sertifikat <strong>{giftInfo.friendName}</strong> (
                {giftInfo.friendTelegram}) nomiga chiqariladi.
              </p>
            )}

            {PAY_CARDS.map((card) => (
              <div className="pay-row" key={card.label}>
                <div className="pay-top">
                  <span className="pay-label mono">{card.label}</span>
                  <span className="pay-holder">{card.holder}</span>
                </div>
                <span className="pay-number mono">{card.displayNumber}</span>
                <button
                  className="pay-btn"
                  onClick={() => handleTransfer(card.number, card.label)}
                >
                  Pul o'tkazish
                </button>
              </div>
            ))}

            <p className="disclaimer">
              {payInstruction} Yodda tuting — bu yerda haqiqiy mahsulot yo'q,
              sof kayfiyat uchun.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
