import { useEffect, useState } from "react";
import type { CertLevel } from "../types";
import { generateCertificate } from "../lib/certificate";

interface CertificateModalProps {
  planName: string;
  certLevel: CertLevel;
  amount: number | null;
  per: string;
  initialName?: string;
  onClose: () => void;
}

export default function CertificateModal({
  planName,
  certLevel,
  amount,
  per,
  initialName = "",
  onClose,
}: CertificateModalProps) {
  const [recipientName, setRecipientName] = useState(initialName);

  useEffect(() => {
    setRecipientName(initialName);
  }, [initialName]);

  function downloadCertificate() {
    const name = recipientName.trim();
    if (!name) return;

    generateCertificate({
      recipientName: name,
      certLevel,
      amount,
      per,
      planName,
    });
  }

  return (
    <div
      className="certificate-overlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="certificate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="certificate-close"
          type="button"
          onClick={onClose}
          aria-label="Yopish"
        >
          &times;
        </button>
        <p className="certificate-kicker">Sertifikat of Appreciation</p>
        <h2 id="certificate-title">Tashakkurnoma</h2>
        <p className="certificate-plan">{planName} tarifi</p>
        <p className="certificate-message">
          Pulingizni bekorga sarflaganingiz uchun tashakkur
        </p>

        <label className="certificate-name">
          Foydalanuvchi ismi
          <input
            autoFocus
            value={recipientName}
            onChange={(event) => setRecipientName(event.target.value)}
            placeholder="Ismingizni kiriting"
          />
        </label>

        <div className="certificate-actions">
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Yopish
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={downloadCertificate}
            disabled={!recipientName.trim()}
          >
            PDF yuklab olish
          </button>
        </div>
      </section>
    </div>
  );
}
