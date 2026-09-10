import logoIcon from "../assets/logo-icon.png";

interface NavProps {
  onScrollTo: (id: string) => void;
}

export default function Nav({ onScrollTo }: NavProps) {
  return (
    <nav className="top">
      <div className="wrap">
        <div className="brand">
          <span className="brand-mark">
            <img src={logoIcon} alt="Sarfla logotipi" />
          </span>
          <span className="logo">
            Sarfla<sup>&reg;</sup>
          </span>
        </div>
        <div className="nav-links">
          <a href="#pricing" onClick={(e) => { e.preventDefault(); onScrollTo("pricing"); }}>
            Tariflar
          </a>
          <a href="#features" onClick={(e) => { e.preventDefault(); onScrollTo("features"); }}>
            Xususiyatlar
          </a>
          <a href="#mahsulotlar" onClick={(e) => { e.preventDefault(); onScrollTo("mahsulotlar"); }}>
            Mahsulotlar
          </a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); onScrollTo("faq"); }}>
            Savollar
          </a>
        </div>
        <button className="btn btn-primary" onClick={() => onScrollTo("pricing")}>
          Boshlash
        </button>
      </div>
    </nav>
  );
}
