// Markdown simplificado para os artigos. Sem HTML: o texto é sempre tratado como texto.
//   ## Título          ### Subtítulo
//   - item             1. item
//   > destaque         **negrito**   *itálico*   [texto](https://link)

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let quote: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    if (list) blocks.push(list);
    if (quote.length) blocks.push({ type: "quote", text: quote.join(" ") });
    paragraph = [];
    list = null;
    quote = [];
  };

  for (const raw of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading) {
      flush();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text: heading[2] });
      continue;
    }
    const bullet = /^[-*•]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      if (paragraph.length || quote.length || (list && list.type !== type)) flush();
      list ??= { type, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    const quoted = /^>\s?(.*)$/.exec(line);
    if (quoted) {
      if (paragraph.length || list) flush();
      quote.push(quoted[1]);
      continue;
    }
    if (list || quote.length) flush();
    paragraph.push(line);
  }
  flush();
  return blocks;
}

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "link"; text: string; href: string };

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) out.push({ type: "text", text: text.slice(last, match.index) });
    if (match[1] != null) out.push({ type: "strong", text: match[1] });
    else if (match[2] != null) out.push({ type: "em", text: match[2] });
    else if (safeHref(match[4])) out.push({ type: "link", text: match[3], href: match[4] });
    else out.push({ type: "text", text: match[3] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ type: "text", text: text.slice(last) });
  return out;
}

function safeHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(href);
}

// Resumo automático: primeiros parágrafos, sem marcações, cortado numa palavra.
export function autoExcerpt(source: string, max = 220) {
  const text = parseMarkdown(source)
    .filter((block) => block.type === "p")
    .map((block) => parseInline(block.text).map((part) => part.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,.;:]$/, "")}…`;
}

export function blocksToMarkdown(blocks: { type: string; text?: string; items?: string[] }[]) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "h3") return `### ${block.text}`;
      if (block.type === "quote") return `> ${block.text}`;
      if (block.type === "ul") return (block.items ?? []).map((item) => `- ${item}`).join("\n");
      if (block.type === "ol") return (block.items ?? []).map((item, index) => `${index + 1}. ${item}`).join("\n");
      return block.text ?? "";
    })
    .join("\n\n");
}
