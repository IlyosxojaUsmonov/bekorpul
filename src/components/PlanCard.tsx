import type { Plan } from "../types";
import { formatSom } from "../utils";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={"plan" + (plan.popular ? " featured" : "")}>
      {plan.popular && <span className="pop">ENG MASHHUR</span>}
      <h3>{plan.name}</h3>
      <div className="amount serif">
        {plan.free ? (
          <>
            0<span className="per"> 00 so'm</span>
          </>
        ) : plan.price === null ? (
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
      {plan.free && <p className="trial-note">Sinab ko'rishingiz mumkin.</p>}
      {plan.inpayToken && (
        <div className="inpay-checkout">
          <inpay-button token={plan.inpayToken} />
        </div>
      )}
    </div>
  );
}
