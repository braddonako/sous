import { site } from "@/config/site";
import { business } from "@/content/business";
import { BookCall } from "@/components/BookCall";
import {
  AutomateIcon,
  CheckIcon,
  ClarifyIcon,
  ClockIcon,
  CustomToolIcon,
  MapPinIcon,
  StorefrontIcon,
  VideoIcon,
} from "@/components/icons";

const helpIcons = {
  "?": ClarifyIcon,
  "⟳": AutomateIcon,
  "▢": CustomToolIcon,
} as const;

function meetingIcon(label: string) {
  const value = label.toLowerCase();
  if (value.includes("min")) return ClockIcon;
  if (value.includes("video")) return VideoIcon;
  if (value.includes("prep")) return CheckIcon;
  return null;
}

function HelpMark({ icon }: { icon: keyof typeof helpIcons }) {
  const Icon = helpIcons[icon];
  return <Icon size={26} />;
}

export function SmallBusiness() {
  const { offer: smb } = business;
  return (
    <section id="smb" className="scroll-mt-6 bg-sage-soft py-16 desk:py-[104px]" aria-labelledby="smb-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <div className="mb-8 flex items-start gap-4 desk:mb-14">
          <StorefrontIcon size={40} className="mt-1 shrink-0 text-sage-deep desk:mt-1.5" />
          <h2 id="smb-title" className="max-w-[14ch] text-[36px] desk:text-[52px]">
            {smb.title}
          </h2>
        </div>

        <ul className="grid list-none gap-[18px] desk:grid-cols-3">
          {smb.helps.map((help) => (
            <li key={help.title} className="rounded-[18px] border border-[#d3ded3] bg-white px-7 py-[30px]">
              <span
                aria-hidden="true"
                className="grid h-[46px] w-[46px] place-items-center rounded-xl bg-sage-deep text-white"
              >
                <HelpMark icon={help.icon} />
              </span>
              <h3 className="mt-[22px] mb-2.5 text-[25px] tracking-[-0.02em]">{help.title}</h3>
              <p className="text-[15.5px] text-[#4e5a52]">{help.body}</p>
              <ul className="mt-4 flex list-none flex-col gap-2 text-[14.5px] text-[#2e3a32]">
                {help.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckIcon size={16} className="mt-0.5 shrink-0 text-sage-deep" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-11 desk:mt-16">
          <h3 className="mb-2 text-[25px] desk:text-[30px]">{smb.familiarTitle}</h3>
          <p className="mb-[26px] text-sage-copy">{smb.familiarSub}</p>
          <ul className="grid list-none gap-3.5 desk:grid-cols-3">
            {smb.familiar.map((note) => (
              <li
                key={note.quote}
                className="flex items-start gap-3.5 rounded-[14px] border border-[#dce4db] bg-paper px-[22px] py-5"
              >
                <span aria-hidden="true" className="font-display text-[30px] leading-[0.9] text-sage">
                  “
                </span>
                <p className="text-[16.5px] leading-[1.4] font-medium">
                  {note.quote}
                  <small className="mt-1.5 block text-sm font-normal text-muted">{note.detail}</small>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13.5px] text-[#5d6b61]">{smb.fine}</p>
        </div>

        <div className="mt-11 grid gap-5 desk:mt-16 desk:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col rounded-[20px] bg-sage-deep px-[22px] py-[26px] text-white desk:px-9 desk:pt-9 desk:pb-8">
            <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-[#b7cdbb]">{smb.firstKicker}</p>
            <h3 className="mt-3.5 mb-3 text-[28px] desk:text-[34px]">{smb.firstTitle}</h3>
            <p className="text-[16.5px] text-[#d3e0d5]">{smb.firstBody}</p>
            <ul className="my-[22px] flex list-none flex-wrap gap-2.5">
              {smb.firstMeta.map((item) => {
                const MetaIcon = meetingIcon(item);
                return (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[13.5px] text-[#e6eee7]"
                  >
                    {MetaIcon ? <MetaIcon size={16} /> : null}
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto flex flex-col items-start gap-3.5 desk:flex-row desk:items-center desk:gap-5">
              <BookCall />
              <p className="inline-flex items-center gap-2 text-[15px] text-[#d3e0d5]">
                <MapPinIcon size={18} />
                {site.serviceArea}
              </p>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#d3ded3] bg-white px-[22px] py-[26px] desk:p-9">
            <h3 className="mb-[26px] text-[26px]">{smb.workTitle}</h3>
            <ol className="list-none">
              {smb.work.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[48px_1fr] gap-[18px] border-t border-[#e3eae3] py-4 first:border-t-0 first:pt-0"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-sage-deep font-display text-lg font-semibold text-sage-deep">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="mb-1 text-[19px] tracking-[-0.01em]">{step.title}</h4>
                    <p className="text-[15px] text-[#56625a]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
