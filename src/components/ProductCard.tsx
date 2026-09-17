import { useState } from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  async function startPayment() {
    setIsStartingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
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
    <div className="product-card">
      <div className="p-cover" aria-hidden="true">
        <div className="book">
          <span className="tag">PDF</span>
          <span className="lines">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
      <h3>{product.title}</h3>
      <p className="p-desc">{product.description}</p>

      <div className="p-actions">
        <button
          className="p-buy"
          onClick={startPayment}
          disabled={isStartingPayment}
        >
          {isStartingPayment
            ? "Yuklanmoqda..."
            : `${product.price.toLocaleString("uz-UZ")} so'm — sotib olish`}
        </button>
        {paymentError && (
          <p className="payment-error" role="alert">
            {paymentError}
          </p>
        )}
        <button
          className="p-more"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Yopish" : "Ko'proq ma'lumot olish"}
          <span className="chev">{open ? "−" : "+"}</span>
        </button>
      </div>

      {open && (
        <div className="p-details">
          <div className="p-row">
            <strong>Kimlar uchun:</strong> {product.audience}
          </div>

          <div className="p-row">
            <strong>Qamrov:</strong>
          </div>
          <ul className="p-scope">
            {product.scope.map((item) => (
              <li key={item}>
                <span className="dot">&#8226;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="p-meta">
            <span>Hajmi: {product.size}</span>
            <span>Format: {product.format}</span>
          </div>

          <button className="p-sample" disabled title="Tez orada faollashadi">
            Bepul namuna
          </button>
        </div>
      )}
    </div>
  );
}
