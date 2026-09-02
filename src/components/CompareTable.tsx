import { COMPARE_ROWS, PLANS } from "../data/plans";

export default function CompareTable() {
  return (
    <div className="compare">
      <table className="cmp mono">
        <thead>
          <tr>
            <th>Xususiyat</th>
            {PLANS.map((p) => (
              <th key={p.id}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.feature}>
              <td className="feat-name">{row.feature}</td>
              {row.values.map((v, i) => (
                <td key={i} className={v !== "—" && i >= 2 ? "yes" : undefined}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
