import { Icon, Stars } from "@/components/icons";
import { ReviewScroller } from "@/components/review-scroller";
import type { GoogleReview } from "@/lib/reviews";

// Cartões de avaliação; a navegação fica no ReviewScroller.
export function ReviewGrid({ reviews }: { reviews: GoogleReview[] }) {
  return (
    <ReviewScroller>
      <ul className="flex gap-5">
        {reviews.map((review) => (
          <li
            key={`${review.id}-${review.author}`}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] xl:w-[calc((100%-2.5rem)/3)]"
          >
            <article className="card-surface flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="display text-6xl leading-[0.6] text-gold" aria-hidden>
                  “
                </span>
                <Icon name="google" size={18} />
              </div>
              <Stars value={review.rating} size={14} className="mt-4 text-stone" />
              <p className="mt-4 line-clamp-[9] flex-1 whitespace-pre-line leading-7 text-ink/85" title={review.text}>
                {review.text}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {review.authorPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.authorPhoto}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="display flex h-10 w-10 items-center justify-center rounded-full bg-sand text-lg text-ink">
                    {review.author.slice(0, 1)}
                  </span>
                )}
                <div className="min-w-0">
                  {review.authorUrl ? (
                    <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold hover:text-wine">
                      {review.author}
                    </a>
                  ) : (
                    <p className="truncate font-semibold">{review.author}</p>
                  )}
                  <p className="text-xs text-stone">{review.relativeTime || formatReviewDate(review.publishedAt)}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </ReviewScroller>
  );
}

function formatReviewDate(value?: string) {
  if (!value) return "Publicado no Google";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Publicado no Google";
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
