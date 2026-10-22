import { theme } from "@/config/site";
import { labels, type OfferStep } from "@/content/home";
import RichText from "./RichText";

export default function StepList({ steps }: { steps: readonly OfferStep[] }) {
  return (
    <ol className="ladder">
      {steps.map((step, index) => {
        const trail = step.price ?? (theme === "kitchen" ? labels.kitchenTrail : null);
        const number = String(index + 1).padStart(2, "0");
        return (
          <li key={step.title} className="ladder-row">
            <div className="ladder-main">
              <span className="ladder-num">{number}</span>
              <h3>
                <RichText text={step.title} />
              </h3>
              {trail ? (
                <>
                  <span className="ladder-dots" aria-hidden="true" />
                  <span className="ladder-trail">{trail}</span>
                </>
              ) : null}
            </div>
            <p>
              <RichText text={step.body} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}
