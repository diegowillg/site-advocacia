import snapshotReviews from "@/data/google-reviews.json";
import { getSettings } from "@/lib/content/settings";

export type GoogleReview = {
  id: string;
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  publishedAt?: string;
  relativeTime?: string;
};

export type ReviewsResult = {
  status: "ready" | "pending" | "error";
  mode: "business" | "places" | "public" | "none";
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
  profileUrl: string;
  notice: string;
};

const MIN_RATING = 4;
// Avaliações de familiares não são exibidas como depoimento de cliente.
const HIDDEN_AUTHORS = new Set(["Jose Antônio Bonifácio"]);

function visible(review: GoogleReview) {
  return review.rating >= MIN_RATING && !HIDDEN_AUTHORS.has(review.author.trim());
}

const savedReviews = (snapshotReviews as GoogleReview[]).filter(visible);

type Fallback = { rating: number; total: number };
const REVALIDATE_SECONDS = 3600;
// Google lento não pode travar a geração da página: cai no retrato salvo.
const FETCH_TIMEOUT_MS = 6000;

export async function getReviews(): Promise<ReviewsResult> {
  const settings = await getSettings();
  const profileUrl = settings.googleProfileUrl;
  const fallback: Fallback = { rating: settings.googleRating, total: settings.googleTotal };

  try {
    if (hasBusinessCredentials()) {
      return await fetchBusinessReviews(profileUrl);
    }
    return await fetchPublicProfile(profileUrl, fallback);
  } catch {
    try {
      if (process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID) {
        return await fetchPlacesReviews(profileUrl);
      }
    } catch {
      return unavailable(profileUrl, fallback);
    }
  }

  return unavailable(profileUrl, fallback);
}

function unavailable(profileUrl: string, fallback: Fallback): ReviewsResult {
  return {
    status: "pending",
    mode: "none",
    rating: fallback.rating,
    total: fallback.total,
    reviews: savedReviews,
    profileUrl,
    notice:
      "Nota, quantidade e comentários conferidos no perfil oficial do Google. Este site não recebe avaliações.",
  };
}

const PROFILE_PB =
  "!1m14!1s0x0:0xc262b6f5de69bfe1!3m12!1m3!1d30041.54397069381!2d-47.96760775!3d-19.74694855!2m3!1f0.0!2f0.0!3f0.0!3m2!1i1024!2i768!4f13.1!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!15i10112!15m108!1m26!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m15!3b1!4b1!5b1!6b1!13b1!14b1!17b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!21m0!22m1!1e81!30m8!3b1!6m2!1b1!2b1!7m2!1e3!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i796";

async function fetchPublicProfile(profileUrl: string, fallback: Fallback): Promise<ReviewsResult> {
  const response = await fetch(
    `https://www.google.com/maps/preview/place?authuser=0&hl=pt-BR&gl=br&pb=${encodeURIComponent(PROFILE_PB)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    },
  );
  if (!response.ok) throw new Error("preview unavailable");
  const raw = await response.text();
  const payload = raw.startsWith(")]}'") ? raw.slice(raw.indexOf("\n") + 1) : raw;
  const data = JSON.parse(payload) as unknown;
  const summary = findSummary(data);
  const named = collectReviews(data).filter(visible);
  const reviews = named.length > 0 ? named : savedReviews;

  if (summary.rating == null && summary.total == null && reviews.length === 0) {
    throw new Error("empty public profile");
  }

  return {
    status: "ready",
    mode: "public",
    rating: summary.rating ?? fallback.rating,
    total: summary.total ?? fallback.total,
    reviews: reviews.filter(visible),
    profileUrl,
    notice:
      "A nota e a quantidade são as do perfil no Google. Os comentários abaixo são os que o Google destaca nesse perfil, apenas de 4 e 5 estrelas. Este site não recebe avaliações. Quem comenta faz isso no Google, e a próxima leitura desta página mostra o que estiver publicado.",
  };
}

function findSummary(node: unknown, acc = { rating: null as number | null, total: null as number | null }) {
  if (!Array.isArray(node) || (acc.rating != null && acc.total != null)) return acc;
  const label = node.find((item): item is string => typeof item === "string" && /^\d+\s+avalia/.test(item));
  const nested = node.find(
    (item) => Array.isArray(item) && item.some((child) => typeof child === "string" && /^\d+\s+avalia/.test(child)),
  );
  if (typeof label === "string" && acc.total == null) acc.total = Number.parseInt(label, 10);
  if (nested && acc.total == null) {
    const nestedLabel = (nested as unknown[]).find(
      (child): child is string => typeof child === "string" && /^\d+\s+avalia/.test(child),
    );
    if (nestedLabel) acc.total = Number.parseInt(nestedLabel, 10);
  }
  if (acc.rating == null && (label || nested)) {
    const score = node.find((item) => typeof item === "number" && item >= 1 && item <= 5);
    if (typeof score === "number") acc.rating = score;
  }
  for (const child of node) findSummary(child, acc);
  return acc;
}

function collectReviews(node: unknown, found: GoogleReview[] = []) {
  if (!Array.isArray(node)) return found;
  const named = parseNamedReview(node);
  if (named && !found.some((review) => review.id === named.id)) found.push(named);
  for (const child of node) collectReviews(child, found);
  return found;
}

function parseNamedReview(item: unknown): GoogleReview | null {
  const wrapped = asArray(item);
  const candidates = [asArray(wrapped[0]), wrapped];
  for (const review of candidates) {
    const name = readPath(review, [1, 4, 5, 0]);
    const text = readPath(review, [2, 15, 0, 0]);
    const rating = readPath(review, [2, 0, 0]);
    if (typeof name !== "string" || typeof text !== "string" || typeof rating !== "number") continue;
    if (name.length < 2 || name.length > 80 || rating < 1 || rating > 5) continue;
    const photo = readPath(review, [1, 4, 5, 1]);
    const time = readPath(review, [1, 6]);
    const id = readPath(review, [0, 0]);
    return {
      id: typeof id === "string" ? id : `${name}-${rating}`,
      author: name,
      authorPhoto: typeof photo === "string" ? toHttps(photo) : undefined,
      rating,
      text: cleanReviewText(text),
      relativeTime: typeof time === "string" ? time : undefined,
    };
  }
  return null;
}

function readPath(node: unknown, path: number[]) {
  let current = node;
  for (const index of path) {
    if (!Array.isArray(current)) return undefined;
    current = current[index];
  }
  return current;
}

function cleanReviewText(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length > 1) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function toHttps(url: string) {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function hasBusinessCredentials() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN &&
      process.env.GOOGLE_BUSINESS_PARENT,
  );
}

async function fetchBusinessReviews(profileUrl: string): Promise<ReviewsResult> {
  const token = await refreshAccessToken();
  const parent = process.env.GOOGLE_BUSINESS_PARENT as string;
  const collected: GoogleReview[] = [];
  let rating: number | null = null;
  let total: number | null = null;
  let pageToken = "";

  for (let page = 0; page < 20; page += 1) {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/${parent.replace(/^\/+/, "")}/reviews`,
    );
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error("business reviews request failed");
    }

    const data = (await response.json()) as BusinessReviewsResponse;
    if (typeof data.averageRating === "number") rating = data.averageRating;
    if (typeof data.totalReviewCount === "number") total = data.totalReviewCount;

    for (const review of data.reviews ?? []) {
      const stars = starToNumber(review.starRating);
      if (stars < MIN_RATING) continue;
      collected.push({
        id: review.reviewId ?? `${review.createTime ?? "review"}-${collected.length}`,
        author: review.reviewer?.displayName || "Usuário do Google",
        authorPhoto: review.reviewer?.profilePhotoUrl,
        rating: stars,
        text: originalComment(review.comment),
        publishedAt: review.updateTime ?? review.createTime,
      });
    }

    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return {
    status: "ready",
    mode: "business",
    rating,
    total,
    reviews: collected.filter(visible),
    profileUrl: dataProfileUrl(profileUrl),
    notice:
      "Comentários de 4 e 5 estrelas, dos mais recentes para os mais antigos. Avaliações novas entram na próxima atualização. A nota geral inclui todas as avaliações publicadas no Google.",
  };
}

async function fetchPlacesReviews(profileUrl: string): Promise<ReviewsResult> {
  const placeId = process.env.GOOGLE_PLACE_ID as string;
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR`;
  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY as string,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
    next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error("places request failed");
  }

  const data = (await response.json()) as PlacesResponse;
  const reviews = (data.reviews ?? [])
    .filter((review) => review.rating >= MIN_RATING)
    .map((review, index) => ({
      id: `${review.publishTime ?? "place"}-${index}`,
      author: review.authorAttribution?.displayName || "Usuário do Google",
      authorUrl: review.authorAttribution?.uri,
      authorPhoto: review.authorAttribution?.photoUri,
      rating: review.rating,
      text: review.text?.text?.trim() || "Avaliação sem texto escrito.",
      publishedAt: review.publishTime,
      relativeTime: review.relativePublishTimeDescription,
    }));

  return {
    status: "ready",
    mode: "places",
    rating: data.rating ?? null,
    total: data.userRatingCount ?? null,
    reviews,
    profileUrl: data.googleMapsUri || profileUrl,
    notice:
      "Seleção de até 5 avaliações de 4 e 5 estrelas, na ordem de relevância definida pelo Google. A nota geral inclui todas as avaliações do perfil. A lista completa está no Google.",
  };
}

async function refreshAccessToken() {
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN as string,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("token refresh failed");
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("missing access token");
  }
  return data.access_token;
}

function starToNumber(star?: string) {
  const map: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return star ? (map[star] ?? 0) : 0;
}

function originalComment(comment?: string) {
  if (!comment?.trim()) return "Avaliação sem texto escrito.";
  const marker = "(Original)";
  const index = comment.indexOf(marker);
  if (index >= 0) return comment.slice(index + marker.length).trim();
  return comment.trim();
}

function dataProfileUrl(fallback: string) {
  return fallback;
}

type BusinessReviewsResponse = {
  reviews?: Array<{
    reviewId?: string;
    starRating?: string;
    comment?: string;
    createTime?: string;
    updateTime?: string;
    reviewer?: { displayName?: string; profilePhotoUrl?: string };
  }>;
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating: number;
    publishTime?: string;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
};
