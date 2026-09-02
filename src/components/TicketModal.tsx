import { useMemo } from "react";
import type { Plan } from "../types";
import { formatSom } from "../utils";

interface TicketModalProps {
  plan: Plan;
  onClose: () => void;
}

export default function TicketModal({ plan, onClose }: TicketModalProps) {
  const certNumber = useMemo(() => Math.floor(100000 + Math.random() * 900000), []);
  const tierLine =
    plan.price !== null ? `${plan.name} — ${formatSom(plan.price)} so'm` : `${plan.name} — o'zingiz belgilagan miqdor`;

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet ticket">
        <p className="kicker2 mono">TASDIQLANDI</p>
        <p className="big serif">Rahmat!</p>
        <p className="small">{tierLine}</p>
        <div className="cert mono">Sertifikat &#8470; {certNumber}</div>
        <p className="small">Evaziga hech narsa kelmaydi. Aynan shunday bo'lishi kerak edi.</p>
        <button className="ok-btn" onClick={onClose}>
          Yopish
        </button>
      </div>
    </div>
  );
}
