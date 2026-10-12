import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq";
import { Hero3D } from "@/components/hero-3d";
import { Icon, Stars, type IconName } from "@/components/icons";
import { ReviewsSection } from "@/components/reviews-section";
import { SectionHeading } from "@/components/section-heading";
import { Panel, Tilt } from "@/components/tilt";
import { formatPostDate } from "@/lib/blog";
import { getImages } from "@/lib/content/images";
import { getPosts } from "@/lib/content/posts";
import { contact, getSettings } from "@/lib/content/settings";
import { getReviews } from "@/lib/reviews";
import {
  navigation,
  otherAreas,
  practiceCards,
  principles,
  steps,
  urgentTopics,
} from "@/lib/site";

const practiceIcons: IconName[] = ["home", "shield", "alert"];
const otherIcons: IconName[] = ["scale", "key", "lock", "contract"];

export default async function HomePage() {
  const [reviews, settings, images, allPosts] = await Promise.all([getReviews(), getSettings(), getImages(), getPosts()]);
  const { whatsappDefault, whatsappUrgent } = contact(settings);
  const rating = reviews.rating ?? settings.googleRating;
  const total = reviews.total ?? settings.googleTotal;
  const posts = allPosts.slice(0, 4);
  const ratingLabel = rating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const featured = allPosts[0];
  const services = navigation.flatMap((item) => item.children ?? []).filter((child) => child.href !== "/urgencias");

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="grain on-dark bg-night relative overflow-hidden text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="page-enter">
            <p className="eyebrow">{settings.heroEyebrow}</p>
            <h1 className="display mt-7 text-[2.9rem] text-cream sm:text-6xl md:text-[5.2rem]">
              <Highlight text={settings.heroTitle} />
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-cream/72 md:text-lg md:leading-8">{settings.heroSubtitle}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappDefault} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <Icon name="whatsapp" size={18} />
                Falar com o advogado
              </a>
              <Link href="/urgencias" className="btn btn-line">
                <Icon name="alert" size={17} />
                Tenho uma situação urgente
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-cream/70 sm:grid-cols-3">
              {["Análise inicial do caso", "Direto com o advogado", "Presencial e on-line"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" size={16} className="shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Hero3D rating={ratingLabel} total={total} oab={settings.oab} photo={images.eduardo} />
        </div>

        {/* Credential strip */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-white/10 px-5 md:grid-cols-4 md:divide-x">
            <Credential label="Nota no Google">
              <span className="flex items-center gap-2">
                {ratingLabel} <Stars value={rating} size={13} className="text-cream" />
              </span>
            </Credential>
            <Credential label="Avaliações públicas">{total} no Google</Credential>
            <Credential label="Inscrição">{settings.oab}</Credential>
            <Credential label="Atendimento">{settings.hoursShort}</Credential>
          </dl>
        </div>
      </section>

      {/* ---------------- Urgent band ---------------- */}
      <section className="bg-wine relative overflow-hidden text-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <p className="display flex items-center gap-3 text-2xl md:text-3xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            Leilão, penhora ou despejo do seu imóvel?
          </p>
          <a
            href={whatsappUrgent}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cream"
          >
            Enviar o documento agora · {settings.whatsapp}
            <Icon name="arrow" size={16} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* ---------------- Practice areas ---------------- */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHeading eyebrow="Atuação" title="Direito Imobiliário e proteção patrimonial em Uberaba" />
          <p className="reveal leading-7 text-stone">
            Contratos, regularização de imóveis, execuções, penhoras, leilões e situações cíveis que colocam o patrimônio em risco. Atendimento técnico, ético e transparente para pessoas físicas, empresas, produtores rurais e investidores.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {practiceCards.map((card, index) => (
            <div key={card.href} className="reveal-3d">
              <Panel className="!p-8">
                <Link href={card.href} className="go-card">
                  <div className="flex items-start justify-between">
                    <span className="icon-badge">
                      <Icon name={practiceIcons[index]} size={22} />
                    </span>
                    <span className="display text-5xl leading-none text-line">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display mt-8 text-3xl">{card.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-stone">{card.text}</p>
                  <span className="go-label">
                    {card.action}
                    <Icon name="arrow" size={15} />
                  </span>
                </Link>
              </Panel>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-[0.18em] text-stone">Serviços</span>
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="rounded-full border border-line bg-white/50 px-4 py-2 text-sm text-ink/80 transition hover:border-wine hover:text-wine"
            >
              {service.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Urgent situations & other areas ---------------- */}
      <section className="bg-paper py-16 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal-3d">
            <Tilt intensity={5}>
              <div className="card-ink h-full p-8 md:p-10">
                <p className="eyebrow on-dark">Prazo correndo</p>
                <h2 className="display mt-5 text-4xl text-cream md:text-5xl">Situações urgentes de risco patrimonial</h2>
                <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {urgentTopics.map((topic, index) => (
                    <li key={topic.title} className="flex gap-5 py-5">
                      <span className="display w-8 shrink-0 text-2xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-semibold text-cream">{topic.title}</p>
                        <p className="mt-1 text-sm leading-6 text-cream/60">{topic.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappUrgent} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                    <Icon name="whatsapp" size={18} />
                    Enviar meu caso
                  </a>
                  <Link href="/urgencias" className="btn btn-line text-cream">
                    Como funciona a triagem
                  </Link>
                </div>
              </div>
            </Tilt>
          </div>

          <div className="flex flex-col">
            <div className="reveal">
              <p className="eyebrow">Outras frentes</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">Demais áreas de atuação</h2>
            </div>
            <ul className="mt-8 grid gap-6">
              {otherAreas.map((area, index) => (
                <li key={area.title} className="reveal flex gap-4">
                  <span className="icon-badge shrink-0">
                    <Icon name={otherIcons[index]} size={20} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold">{area.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone">{area.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {featured ? (
              <div className="reveal mt-10">
                <Panel>
                  <Link href={`/blog/${featured.slug}`} className="go-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-wine">Leitura recomendada</p>
                    <h3 className="display mt-3 text-2xl">{featured.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone">{featured.excerpt}</p>
                    <span className="go-label">
                      Ler o artigo
                      <Icon name="arrow" size={15} />
                    </span>
                  </Link>
                </Panel>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="grain on-dark bg-night relative overflow-hidden py-16 text-cream md:py-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
          <SectionHeading
            dark
            align="center"
            eyebrow="Como funciona"
            title="Do primeiro contato às medidas cabíveis"
            lede="Atendimento organizado e transparente, com clareza sobre prazos, custos e caminhos possíveis."
          />
          <ol className="relative mt-16 grid gap-5 md:grid-cols-3">
            <span aria-hidden className="gold-rule absolute left-[16%] right-[16%] top-[3.25rem] hidden md:block" />
            {steps.map((step) => (
              <li key={step.number} className="reveal-3d">
                <Panel tone="ink" className="text-center">
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink">
                    <span className="display text-2xl text-gold">{step.number}</span>
                  </span>
                  <h3 className="display mt-6 text-2xl text-cream md:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream/65">{step.text}</p>
                </Panel>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 py-16 md:py-32 lg:grid-cols-2">
        <div className="reveal-3d relative order-last lg:order-first">
          <div aria-hidden className="absolute -left-4 -top-4 h-full w-full rounded-[1.6rem] border border-gold-deep/40" />
          <Tilt intensity={8}>
            <figure className="frame-gold relative overflow-hidden rounded-[1.6rem] shadow-[0_50px_80px_-45px_rgba(12,11,12,0.8)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={images.socios.src}
                  alt={images.socios.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-3 p-4 text-cream sm:gap-4 sm:p-6">
                <div>
                  <p className="display whitespace-nowrap text-base sm:text-xl">Dr. Eduardo Bonifácio</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">{settings.oab}</p>
                </div>
                <div className="text-right">
                  <p className="display whitespace-nowrap text-base sm:text-xl">Dr. Rômulo B. Cassiano</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">{settings.partnerOab}</p>
                </div>
              </figcaption>
            </figure>
          </Tilt>
        </div>
        <div>
          <SectionHeading
            eyebrow="Sobre o escritório"
            title={<>Atendimento pessoal, técnico e <em className="text-wine">transparente</em></>}
            lede={`Cada caso é conduzido pessoalmente pelo Dr. Eduardo Bonifácio e pelo ${settings.partnerName}, sócios da ${settings.firm}, com linguagem acessível e comunicação constante.`}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <li key={item} className="reveal flex gap-3 border-t border-line pt-4 text-sm leading-6">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-wine" />
                {item}
              </li>
            ))}
          </ul>
          <div className="reveal mt-10 flex flex-wrap items-center gap-6">
            <Link href="/escritorio" className="btn btn-dark">
              Conheça o escritório
              <Icon name="arrow" size={16} />
            </Link>
            <p className="flex items-center gap-2 text-sm text-stone">
              <Icon name="building" size={18} className="text-wine" />
              {settings.building}, Uberaba
            </p>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading eyebrow="Perguntas frequentes" title="Antes de enviar os documentos" />
          <p className="reveal mt-6 max-w-sm leading-7 text-stone">
            Respostas gerais. A orientação para o seu caso depende da leitura dos documentos e dos prazos.
          </p>
          <a href={whatsappDefault} target="_blank" rel="noopener noreferrer" className="text-link reveal mt-8">
            Tenho outra dúvida
            <Icon name="arrow" size={15} />
          </a>
        </div>
        <div className="reveal">
          <FaqList />
        </div>
      </section>

      {/* ---------------- Blog ---------------- */}
      {posts.length ? (
        <section className="bg-paper py-16 md:py-28">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Blog jurídico" title="Conteúdos para proteger imóveis e patrimônio" />
              <Link href="/blog" className="text-link reveal shrink-0">
                Acessar o blog
                <Icon name="arrow" size={15} />
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {posts.map((post) => (
                <div key={post.slug} className="reveal-3d">
                  <Panel className="!p-8">
                    <Link href={`/blog/${post.slug}`} className="go-card">
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone">
                        <Icon name="document" size={15} className="text-wine" />
                        {formatPostDate(post.date)}
                      </p>
                      <h3 className="display mt-4 text-3xl">{post.title}</h3>
                      <p className="mt-3 flex-1 leading-7 text-stone">{post.excerpt}</p>
                      <span className="go-label">
                        Ler artigo
                        <Icon name="arrow" size={15} />
                      </span>
                    </Link>
                  </Panel>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}

function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={index} className="gold-text">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Credential({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-5 md:px-6 md:first:pl-0">
      <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/45">{label}</dt>
      <dd className="display mt-1 text-xl text-cream md:text-2xl">{children}</dd>
    </div>
  );
}
