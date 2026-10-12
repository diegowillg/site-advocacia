import { resetImageAction } from "@/app/admin/actions";
import { ImageSlotForm } from "@/app/admin/(painel)/imagens/image-slot-form";
import { getImages, getSavedImages, imageSlots, type ImageSlot } from "@/lib/content/images";
import { MAX_UPLOAD_MB } from "@/lib/content/image-upload";

export default async function AdminImages({ searchParams }: PageProps<"/admin/imagens">) {
  const [images, saved, params] = await Promise.all([getImages(), getSavedImages(), searchParams]);

  return (
    <>
      <p className="eyebrow">Imagens</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Fotos do site</h1>
      <p className="mt-3 max-w-2xl text-stone">
        Envie uma foto nova para substituir a atual. Aceita JPG, PNG ou WebP até {MAX_UPLOAD_MB} MB. O site reduz e otimiza a
        imagem sozinho. Prefira fotos na vertical para retratos.
      </p>
      {params.restaurado ? (
        <p role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Imagem original restaurada.
        </p>
      ) : null}

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {(Object.keys(imageSlots) as ImageSlot[]).map((slot) => (
          <li key={slot} className="overflow-hidden rounded-2xl border border-line bg-white">
            <ImageSlotForm
              key={images[slot].src}
              slot={slot}
              label={imageSlots[slot].label}
              usage={imageSlots[slot].usage}
              image={images[slot]}
              custom={Boolean(saved[slot]?.src)}
            />
            {saved[slot] ? (
              <form action={resetImageAction} className="border-t border-line px-5 py-3">
                <input type="hidden" name="slot" value={slot} />
                <button type="submit" className="text-xs text-stone underline underline-offset-4 hover:text-wine">
                  Restaurar a foto original
                </button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
