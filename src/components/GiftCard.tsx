import { useState } from "react";
import type { FormEvent } from "react";
import { GIFT_PLAN } from "../data/plans";
import { formatSom } from "../utils";
import type { GiftInfo } from "../types";

interface GiftCardProps {
  onGift: (info: GiftInfo) => void;
}

function normalizeTelegram(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export default function GiftCard({ onGift }: GiftCardProps) {
  const [friendName, setFriendName] = useState("");
  const [friendTelegram, setFriendTelegram] = useState("");
  const [fromName, setFromName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = friendName.trim();
    const tg = normalizeTelegram(friendTelegram);

    if (!name || tg.length < 2) {
      setError("Ism va Telegram username kiriting.");
      return;
    }

    setError(null);
    onGift({ friendName: name, friendTelegram: tg, fromName: fromName.trim() || undefined });
  }

  return (
    <div className="plan gift-plan">
      <span className="pop">DO'STGA SOVG'A</span>
      <h3>Hech narsa sovg'a qiling</h3>
      <div className="amount serif">
        {formatSom(GIFT_PLAN.price as number)}
        <span className="per"> so'm</span>
      </div>
      <p className="desc">Do'stingiz uchun ham pulingizni bekorga sarflang. U buni hech kutmagan bo'ladi.</p>

      <form className="gift-form" onSubmit={handleSubmit} noValidate>
        <input
          className="field"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          placeholder="Do'stning ismi"
          aria-label="Do'stning ismi"
        />
        <input
          className="field"
          value={friendTelegram}
          onChange={(e) => setFriendTelegram(e.target.value)}
          placeholder="@username"
          aria-label="Do'stning Telegram username'i"
        />
        <input
          className="field"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          placeholder="Kimdan (ixtiyoriy)"
          aria-label="Sizning ismingiz"
        />

        {error && <p className="field-error">{error}</p>}

        <button type="submit" className="cta">
          Sovg'a qilish
        </button>
      </form>
    </div>
  );
}
