import { isRealEmail, site } from "@/config/site";
import { BookCall } from "@/components/BookCall";
import { MailIcon } from "@/components/icons";

type CtaCopy = {
  eyebrow: string;
  title: string;
  body: string;
  emailLead: string;
  emailBadge: string;
};

export function FinalCta({ cta }: { cta: CtaCopy }) {
  const email = site.email.trim();
  const showEmail = isRealEmail(email) && email !== "#";

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-[72px] text-center text-white desk:py-[110px]">
      <div className="cta-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <p className="eyebrow kicker-dash text-muted-dark">{cta.eyebrow}</p>
        <h2 className="mx-auto mt-[18px] mb-5 max-w-[900px] text-[36px] desk:text-[60px]">{cta.title}</h2>
        <p className="mx-auto mb-[34px] max-w-[720px] text-[17px] text-[#c9cdd3] desk:text-[19px]">{cta.body}</p>
        <BookCall />
        <p className="mt-[22px] inline-flex items-center justify-center gap-2 text-[15px] text-muted-dark">
          <MailIcon size={18} />
          <span>
            {cta.emailLead}{" "}
            {showEmail ? (
              <a href={`mailto:${email}`} className="font-semibold text-white underline underline-offset-[3px]">
                {email}
              </a>
            ) : (
              <span className="ph text-muted-dark">{cta.emailBadge}</span>
            )}
          </span>
        </p>
      </div>
    </section>
  );
}
