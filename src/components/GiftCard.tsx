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
    <div className="gift-banner">
      <div className="gift-banner-text">
        <h3>
          Sarflashni sovg'a qiling
          <span className="gift-banner-price mono">
            {formatSom(GIFT_PLAN.price as number)} so'm
          </span>
        </h3>
        <p>Do'stingiz uchun ham pulingizni bekorga sarflang. U buni hech kutmagan bo'ladi.</p>
      </div>

      <form className="gift-banner-form" onSubmit={handleSubmit} noValidate>
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
        <button type="submit" className="cta">
          Sovg'a qilish
        </button>
        {error && <p className="field-error">{error}</p>}
      </form>
    </div>
  );
}
