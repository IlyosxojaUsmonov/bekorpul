import { PLANS } from "../data/plans";
import PlanCard from "./PlanCard";
import GiftCard from "./GiftCard";
import CompareTable from "./CompareTable";

interface PricingProps {
  onCertificateTest: () => void;
}

export default function Pricing({ onCertificateTest }: PricingProps) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Tariflar</div>
          <h2 className="serif">Har kimga mos &mdash; sarflash.</h2>
          <p>
            Beshta tarif. Beshtasida ham natija bir xil. Farqi &mdash; qanchalik
            dabdabali sarflashingizda.
          </p>
          <button
            className="btn btn-ghost certificate-test-button"
            type="button"
            onClick={onCertificateTest}
          >
            Sertifikatni sinash
          </button>
        </div>

        <div className="price-grid">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <GiftCard />

        <CompareTable />
      </div>
    </section>
  );
}
