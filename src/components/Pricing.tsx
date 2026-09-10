import { PLANS } from "../data/plans";
import type { Plan, GiftInfo } from "../types";
import PlanCard from "./PlanCard";
import GiftCard from "./GiftCard";
import CompareTable from "./CompareTable";

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
  onGift: (info: GiftInfo) => void;
}

export default function Pricing({ onSelectPlan, onGift }: PricingProps) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Tariflar</div>
          <h2 className="serif">Har kimga mos &mdash; hech narsa.</h2>
          <p>Beshta tarif. Beshtasida ham natija bir xil. Farqi &mdash; qanchalik dabdabali hech narsa olishingizda.</p>
        </div>

        <div className="price-grid">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>

        <GiftCard onGift={onGift} />

        <CompareTable />
      </div>
    </section>
  );
}
