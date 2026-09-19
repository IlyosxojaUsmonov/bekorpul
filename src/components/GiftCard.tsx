import { useState } from "react";
import { GIFT_PLAN } from "../data/plans";
import { formatSom } from "../utils";

export default function GiftCard() {
  const [friendName, setFriendName] = useState("");
  const [friendTelegram, setFriendTelegram] = useState("");
  const [fromName, setFromName] = useState("");

  return (
    <div className="gift-banner">
      <div className="gift-banner-text">
        <h3>
          Sarflashni sovg'a qiling
          <span className="gift-banner-price mono">
            {formatSom(GIFT_PLAN.price as number)} so'm
          </span>
        </h3>
        <p>
          Do'stingiz uchun ham pulingizni bekorga sarflang. U buni hech kutmagan
          bo'ladi.
        </p>
      </div>

      <div className="gift-banner-form">
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
      </div>
      <div className="gift-banner-payment">
        <inpay-button token="btn_60a52ee3fea7ac9371d7" />
      </div>
    </div>
  );
}
