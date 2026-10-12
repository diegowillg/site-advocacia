import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { Panel } from "@/components/tilt";

export type AreaTopic = { title: string; text: string; icon: IconName };

export function AreaTopics({
  eyebrow,
  title,
  topics,
  note,
  links = [],
}: {
  eyebrow: string;
  title: string;
  topics: AreaTopic[];
  note?: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 md:py-28">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-5 text-4xl md:text-5xl">{title}</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {topics.map((topic) => (
          <div key={topic.title} className="reveal-3d">
            <Panel className="!p-8">
              <span className="icon-badge">
                <Icon name={topic.icon} size={22} />
              </span>
              <h3 className="display mt-6 text-3xl">{topic.title}</h3>
              <p className="mt-3 leading-7 text-stone">{topic.text}</p>
            </Panel>
          </div>
        ))}
      </div>
      {note || links.length ? (
        <div className="reveal mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-[1.4fr_1fr]">
          {note ? <p className="max-w-3xl text-lg leading-8 text-ink/80">{note}</p> : <span />}
          {links.length ? (
            <ul className="flex flex-col gap-3 md:items-end">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-link">
                    {link.label}
                    <Icon name="arrow" size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
