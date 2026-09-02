import type { Plan } from "../types";
import { formatSom } from "../utils";

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export default function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div className={"plan" + (plan.popular ? " featured" : "")}>
      {plan.popular && <span className="pop">ENG MASHHUR</span>}
      <h3>{plan.name}</h3>
      <div className="amount serif">
        {plan.price === null ? (
          <>
            O'zingiz<span className="per"> belgilaysiz</span>
          </>
        ) : (
          <>
            {plan.price === 0 ? "0" : formatSom(plan.price)}
            <span className="per"> so'm{plan.per}</span>
          </>
        )}
      </div>
      <p className="desc">{plan.desc}</p>
      <ul>
        {plan.feats.map((f) => (
          <li key={f}>
            <span className="check">&#10003;</span>
            {f}
          </li>
        ))}
      </ul>
      <button className="cta" onClick={() => onSelect(plan)}>
        {plan.free ? "Bepul boshlash" : "Tanlash"}
      </button>
    </div>
  );
}
