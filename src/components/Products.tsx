import "../styles/products.css";
import { PRODUCTS, PRODUCT_BUNDLE } from "../data/products";
import ProductCard from "./ProductCard";
import { formatSom } from "../utils";

export default function Products() {
  return (
    <section id="mahsulotlar" className="products-section">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Mahsulotlar</div>
          <h2 className="serif">Haqiqiy bilim, PDF formatida.</h2>
          <p>Bu yerdagilar hazil emas &mdash; sotib olganingizda haqiqiy qo'llanmani yuklab olasiz.</p>
        </div>

        <div className="guarantee">
          <span className="guarantee-badge">100% kafolat</span>
          <p>Qo'llanma yoqmasa &mdash; qaysi qismi yoqmaganini bizga aytib bering, pulingizni to'liq qaytarib beramiz.</p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="bundle-block">
          <div className="bundle-text">
            <h3>{PRODUCT_BUNDLE.title}</h3>
            <p>{PRODUCT_BUNDLE.description}</p>
          </div>
          <div className="bundle-price">
            <span className="old mono">{formatSom(PRODUCT_BUNDLE.originalPrice)} so'm</span>
            <span className="new serif">{formatSom(PRODUCT_BUNDLE.price)} so'm</span>
            <span className="discount">-{PRODUCT_BUNDLE.discountPercent}%</span>
          </div>
          <div className="bundle-cta">
            <button disabled title="Tez orada faollashadi">
              Paketni sotib olish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
