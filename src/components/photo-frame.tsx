import Image from "next/image";
import { Tilt } from "@/components/tilt";

export function PhotoFrame({
  src,
  alt,
  ratio = "aspect-[4/3]",
  sizes,
  priority = false,
  caption,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes: string;
  priority?: boolean;
  caption?: string;
}) {
  return (
    <Tilt intensity={7}>
      <figure className="photo-frame group h-full">
        <div className={`frame-gold relative overflow-hidden rounded-[1.1rem] shadow-[0_30px_50px_-35px_rgba(12,11,12,0.7)] ${ratio}`}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        {caption ? <figcaption className="px-1 pt-3 text-sm text-stone">{caption}</figcaption> : null}
      </figure>
    </Tilt>
  );
}
