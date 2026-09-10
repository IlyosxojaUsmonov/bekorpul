import "../styles/products.css";
import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";

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

        <div className={"products-grid" + (PRODUCTS.length === 1 ? " single" : "")}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
