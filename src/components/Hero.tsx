interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1 className="headline serif">
            Pulingizni sarflashning eng <em>qulay</em> yo'li.
          </h1>
          <p className="sub">Tarifni tanlang, kartangiz orqali bir necha soniyada to'lang. Tez, shaffof va halol.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onScrollTo("pricing")}>
              Tariflarni ko'rish
            </button>
            <button className="btn btn-ghost" onClick={() => onScrollTo("mahsulotlar")}>
              Qanday ishlaydi?
            </button>
          </div>
        </div>

        <div className="mock">
          <div className="mock-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-body">
            <div className="mock-stats">
              <div className="mock-stat">
                <div className="k">Foydalanuvchi</div>
                <div className="v">0</div>
              </div>
              <div className="mock-stat">
                <div className="k">Natija</div>
                <div className="v">yo'q</div>
              </div>
              <div className="mock-stat">
                <div className="k">O'sish</div>
                <div className="v">&mdash;</div>
              </div>
            </div>
            <div className="mock-chart">
              <div className="label">Faollik grafigi</div>
              <svg viewBox="0 0 300 60" preserveAspectRatio="none">
                <line x1="0" y1="46" x2="300" y2="46" stroke="var(--line)" strokeWidth={1} />
                <path d="M0,30 L300,30" fill="none" stroke="var(--accent)" strokeWidth={2} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
