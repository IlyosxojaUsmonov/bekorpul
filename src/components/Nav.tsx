import logo from "../assets/logo-full.png";

interface NavProps {
  onScrollTo: (id: string) => void;
}

export default function Nav({ onScrollTo }: NavProps) {
  return (
    <nav className="top">
      <div className="wrap">
        <div className="brand">
          <span className="brand-mark brand-mark--full">
            <img src={logo} alt="Sarfla logotipi" />
          </span>
        </div>
        <div className="nav-links">
          <a href="#pricing" onClick={(e) => { e.preventDefault(); onScrollTo("pricing"); }}>
            Tariflar
          </a>
          <a href="#mahsulotlar" onClick={(e) => { e.preventDefault(); onScrollTo("mahsulotlar"); }}>
            Mahsulotlar
          </a>
        </div>
        <button className="btn btn-primary" onClick={() => onScrollTo("pricing")}>
          Boshlash
        </button>
      </div>
    </nav>
  );
}
