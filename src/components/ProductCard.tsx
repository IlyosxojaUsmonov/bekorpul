import { useState } from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="product-card">
      <span className="p-soon-badge">Tez orada</span>
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
        <button className="p-buy" disabled title="Tez orada faollashadi">
          Sotib olish
        </button>
        <button className="p-more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
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
