import { useEffect, useRef, useState } from "react";
import type { Plan } from "../types";
import { PAY_CARDS } from "../data/plans";
import { copyText, formatSom } from "../utils";

interface CheckoutModalProps {
  plan: Plan;
  onToast: (msg: string) => void;
  onClose: () => void;
}

const DODGE_TEASES = [
  "Ushlab bo'lmaydi 😏",
  "Bu yoqqa emas!",
  "Deyarli tutdingiz...",
  "Yo'q-yo'q 🙈",
  "Bu oyna qo'lda yopilmaydi 🙃",
  "Harakat davom etsin!",
  "Sekinroq...",
  "Rahmat, urinish uchun",
];

// 30 soniyadan keyin shu savollar ketma-ket, tobora shubha bilan so'raladi —
// oxirgisiga "Ha" deyilgach oyna haqiqatan yopiladi.
const CONFIRM_QUESTIONS = [
  "Pul yubordingizmi?",
  "Aniqmi?",
  "Rostanmi?",
  "Ishonchingiz komilmi?",
  "Haqiqatan-chinakamiga-a?",
];

function randomDodgePos() {
  return { left: Math.random() * 80, top: Math.random() * 68 };
}

export default function CheckoutModal({ plan, onToast, onClose }: CheckoutModalProps) {
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [isEvading, setIsEvading] = useState(false);
  const [teaseIdx, setTeaseIdx] = useState(0);
  const [pulseCard, setPulseCard] = useState(false);
  const [confirmStep, setConfirmStep] = useState(-1);
  const [finished, setFinished] = useState(false);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  const priceLabel =
    plan.price === null
      ? "Miqdorni o'zingiz belgilaysiz — evaziga hech narsa"
      : `${formatSom(plan.price)} so'm${plan.per} evaziga hech narsa`;

  const payInstruction =
    plan.price === null
      ? "Nusxalagach, ilovada xohlagan miqdorni o'tkazing."
      : `Nusxalagach, ilovada aynan ${formatSom(plan.price)} so'm${plan.per} o'tkazing.`;

  // × tugma birinchi marta "o'ynay" boshlagach, u to'xtovsiz atrofga sakrab yuraveradi
  useEffect(() => {
    if (!isEvading) return;
    const id = setInterval(() => setPos(randomDodgePos()), 700);
    return () => clearInterval(id);
  }, [isEvading]);

  // 30 soniyadan keyin tasdiqlash so'rovlari boshlanadi
  useEffect(() => {
    const id = setTimeout(() => setConfirmStep(0), 30000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (confirmStep < 0) return;
    confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [confirmStep]);

  function handleConfirmYes() {
    if (confirmStep >= CONFIRM_QUESTIONS.length - 1) {
      setFinished(true);
      setTimeout(onClose, 1500);
      return;
    }
    setConfirmStep((s) => s + 1);
  }

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

  function evadeClose() {
    setIsEvading(true);
    setPos(randomDodgePos());
    const nextIdx = (teaseIdx + 1) % DODGE_TEASES.length;
    setTeaseIdx(nextIdx);
    firstCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setPulseCard(true);
    setTimeout(() => setPulseCard(false), 900);
    onToast(DODGE_TEASES[nextIdx]);
  }

  return (
    <div className="overlay open">
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <div className="sheet-head">
          <h3 id="checkoutTitle" className="serif">
            {plan.name} tarifi
          </h3>
          <button
            className="close dodge-close"
            aria-label="Yopish (agar uddalasangiz)"
            style={pos ? { left: `${pos.left}%`, top: `${pos.top}%`, right: "auto" } : undefined}
            onMouseEnter={evadeClose}
            onClick={evadeClose}
          >
            &times;
          </button>
        </div>
        {isEvading && <p className="escape-hint mono">💸 Pul tashlasangiz — yopiladi</p>}
        <p className="selected-price mono">{priceLabel}</p>

        {PAY_CARDS.map((card, i) => (
          <div
            className={"pay-row" + (i === 0 && pulseCard ? " pulse" : "")}
            key={card.label}
            ref={i === 0 ? firstCardRef : undefined}
          >
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

        <p className="disclaimer">
          Bu oyna qo'lda yopilmaydi. {payInstruction}
        </p>

        {confirmStep >= 0 && (
          <div className="confirm-gauntlet" ref={confirmRef}>
            {finished ? (
              <p className="mono">Rahmat! 🙏</p>
            ) : (
              <>
                <p className="mono">{CONFIRM_QUESTIONS[confirmStep]}</p>
                <button className="pay-btn" onClick={handleConfirmYes}>
                  Ha
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
