import { faqs } from "@/lib/site";

type FaqItem = { question: string; answer: string };

export function FaqList({ items = faqs }: { items?: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <details key={item.question} className="faq-item group" name="faq">
          <summary className="flex cursor-pointer list-none items-start gap-5 py-6 text-left">
            <span className="display mt-0.5 w-8 shrink-0 text-xl text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-lg font-semibold leading-snug md:text-xl">{item.question}</span>
            <span className="faq-icon text-ink" aria-hidden />
          </summary>
          <div className="faq-body">
            <p className="max-w-3xl pb-7 pl-13 pr-12 leading-7 text-stone">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
