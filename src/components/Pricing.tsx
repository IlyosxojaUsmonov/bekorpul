import { PLANS } from "../data/plans";
import type { Plan } from "../types";
import PlanCard from "./PlanCard";
import CompareTable from "./CompareTable";

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Tariflar</div>
          <h2 className="serif">Har kimga mos &mdash; hech narsa.</h2>
          <p>To'rtta tarif. To'rttasida ham natija bir xil. Farqi &mdash; qanchalik dabdabali hech narsa olishingizda.</p>
        </div>

        <div className="price-grid">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>

        <CompareTable />
      </div>
    </section>
  );
}
