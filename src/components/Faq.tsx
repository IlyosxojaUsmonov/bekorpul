import { FAQ_ITEMS } from "../data/plans";

export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Savollar</div>
          <h2 className="serif">Ko'p so'raladigan savollar</h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
