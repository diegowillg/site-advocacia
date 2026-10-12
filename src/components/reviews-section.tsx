import { Icon, Stars } from "@/components/icons";
import { ReviewGrid } from "@/components/review-grid";
import { Tilt } from "@/components/tilt";
import { getReviews } from "@/lib/reviews";

export async function ReviewsSection() {
  const data = await getReviews();
  const ratingLabel =
    data.rating != null
      ? data.rating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : null;

  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-paper py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="reveal">
            <p className="eyebrow">Credibilidade</p>
            <h2 className="display mt-5 text-4xl text-ink md:text-[3.4rem]">O que dizem os clientes</h2>
            <p className="mt-5 max-w-lg leading-7 text-stone">
              Avaliações públicas no perfil profissional do Google. Nenhuma avaliação é recebida ou editada por este site.
            </p>
          </div>

          <Tilt intensity={6} className="reveal">
            <div className="card-surface flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
              {ratingLabel && data.total != null ? (
                <div className="flex items-center gap-5">
                  <p className="display text-7xl leading-none text-ink">{ratingLabel}</p>
                  <div>
                    <Stars value={data.rating ?? 5} size={18} className="text-stone" />
                    <p className="mt-2 flex items-center gap-2 text-sm text-stone">
                      <Icon name="google" size={16} />
                      {data.total} {data.total === 1 ? "avaliação" : "avaliações"} no Google
                    </p>
                  </div>
                </div>
              ) : (
                <p className="display text-3xl text-ink">Avaliações do escritório</p>
              )}
              <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark shrink-0">
                Ver todas no Google
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </Tilt>
        </div>

        {data.reviews.length > 0 ? (
          <div className="mt-12">
            <ReviewGrid reviews={data.reviews} />
          </div>
        ) : null}

        {data.status === "ready" && data.rating != null && data.total != null ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LegalService",
                name: "Dr. Eduardo Bonifácio",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: data.rating,
                  reviewCount: data.total,
                  bestRating: 5,
                  worstRating: 1,
                },
              }),
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
