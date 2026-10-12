import { Fragment } from "react";
import { Icon } from "@/components/icons";
import { parseInline, parseMarkdown } from "@/lib/content/markdown";

// Renderiza o corpo de um artigo. Sem hooks: serve para o site e para a pré-visualização do painel.
export function PostBody({ source, dropCap = true }: { source: string; dropCap?: boolean }) {
  const blocks = parseMarkdown(source);
  const firstParagraph = blocks.findIndex((block) => block.type === "p");

  return (
    <div className="prose-legal space-y-6 text-[1.075rem] leading-8 text-ink/85">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index} className="display pt-6 text-3xl text-ink md:text-4xl"><Inline text={block.text} /></h2>;
        if (block.type === "h3") return <h3 key={index} className="display pt-4 text-2xl text-ink md:text-3xl"><Inline text={block.text} /></h3>;
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="border-l-2 border-gold pl-5 font-serif text-xl italic leading-8 text-ink">
              <Inline text={block.text} />
            </blockquote>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const Tag = block.type;
          return (
            <Tag key={index} className="space-y-3">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-4">
                  {block.type === "ol" ? (
                    <span className="display w-6 shrink-0 text-xl text-gold-deep">{itemIndex + 1}.</span>
                  ) : (
                    <Icon name="check" size={18} className="mt-1.5 shrink-0 text-wine" />
                  )}
                  <span>
                    <Inline text={item} />
                  </span>
                </li>
              ))}
            </Tag>
          );
        }
        const cap = dropCap && index === firstParagraph;
        return (
          <p
            key={index}
            className={
              cap
                ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-wine"
                : ""
            }
          >
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((part, index) => {
        if (part.type === "strong") return <strong key={index} className="font-semibold text-ink">{part.text}</strong>;
        if (part.type === "em") return <em key={index}>{part.text}</em>;
        if (part.type === "link") {
          const external = /^https?:/i.test(part.href);
          return (
            <a
              key={index}
              href={part.href}
              className="text-wine underline decoration-wine/30 underline-offset-4 hover:decoration-wine"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {part.text}
            </a>
          );
        }
        return <Fragment key={index}>{part.text}</Fragment>;
      })}
    </>
  );
}
