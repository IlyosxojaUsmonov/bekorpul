const FEATURES = [
  {
    icon: "∞",
    title: "Cheksiz masshtablanish",
    desc: "Ishlab chiqarish uchun resurs kerak emas — shuning uchun cheklov ham yo'q.",
  },
  {
    icon: "∅",
    title: "100% xavfsizlik",
    desc: "Hech kim o'g'irlay olmaydi — o'g'irlaydigan narsa yo'q.",
  },
  {
    icon: "→",
    title: "Tezkor yetkazib berish",
    desc: "Darhol yetib boradi, chunki yo'lda yo'qoladigan narsa yo'q.",
  },
];

export default function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Xususiyatlar</div>
          <h2 className="serif">Nega aynan Sarfla?</h2>
          <p>Ustunlarimiz mavjud emas, lekin ular haqida gapirishni yaxshi ko'ramiz.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f) => (
            <div className="feat" key={f.title}>
              <div className="ico">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
