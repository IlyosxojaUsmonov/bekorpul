import logoIcon from "../assets/react-icon.svg";

interface NavProps {
  onScrollTo: (id: string) => void;
}

export default function Nav({ onScrollTo }: NavProps) {
  return (
    <nav className="top">
      <div className="wrap">
        <div className="brand">
          <span className="brand-mark">
            <img src={logoIcon} alt="BekorPul logotipi" />
          </span>
          <span className="logo">
            BekorPul<sup>&reg;</sup>
          </span>
        </div>
        <div className="nav-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); onScrollTo("features"); }}>
            Xususiyatlar
          </a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); onScrollTo("pricing"); }}>
            Tariflar
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
