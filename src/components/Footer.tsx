import logo from "../assets/logo-full.png";
import { FOOTER_JOKES } from "../data/plans";

interface FooterProps {
  onJoke: (msg: string) => void;
  onScrollTo: (id: string) => void;
}

export default function Footer({ onJoke, onScrollTo }: FooterProps) {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              <span className="brand-mark brand-mark--full">
                <img src={logo} alt="Sarfla logotipi" />
              </span>
            </div>
            <p className="blurb">Sarflashni professional darajada yetkazib beruvchi platforma.</p>
          </div>

          <div className="foot-col">
            <h4>Mahsulot</h4>
            <ul>
              <li><a href="#pricing">Tariflar</a></li>
              <li>
                <a
                  href="#mahsulotlar"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollTo("mahsulotlar");
                  }}
                >
                  Mahsulotlar
                </a>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Ko'proq</h4>
            <ul>
              {Object.entries(FOOTER_JOKES).map(([key, msg]) => (
                <li key={key}>
                  <button onClick={() => onJoke(msg)}>
                    {key === "contact" ? "Aloqa" : "Foydalanish shartlari"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>&copy; 2026 Sarfla. Barcha huquqlar &mdash; bo'sh.</span>
          <span>Norasmiy hazil loyihasi &middot; to'lovlar shaxsiy kartalarga tushadi</span>
        </div>
      </div>
    </footer>
  );
}
