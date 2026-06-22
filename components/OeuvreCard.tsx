import Link from "next/link";
import Image from "next/image";
import type { Oeuvre } from "@prisma/client";
import { StatusBadge } from "./StatusBadge";

const mediaLabel: Record<string, string> = {
  MANGA: "Manga",
  ROMAN: "Roman",
  AUDIO: "Audio",
};

const mediaGradient: Record<string, string> = {
  MANGA: "from-violet-900 to-violet-800",
  ROMAN: "from-emerald-900 to-emerald-800",
  AUDIO: "from-amber-900 to-amber-800",
};

const mediaEmoji: Record<string, string> = {
  MANGA: "📖",
  ROMAN: "📚",
  AUDIO: "🎧",
};

export function OeuvreCard({ oeuvre }: { oeuvre: Oeuvre }) {
  return (
    <Link
      href={`/oeuvre/${oeuvre.id}`}
      className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all hover:scale-[1.02]"
    >
      <div
        className={`aspect-[2/3] bg-gradient-to-b ${mediaGradient[oeuvre.mediaType]} flex items-center justify-center relative`}
      >
        {oeuvre.couvertureUrl ? (
          <Image
            src={oeuvre.couvertureUrl}
            alt={oeuvre.titre}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <span className="text-4xl">{mediaEmoji[oeuvre.mediaType]}</span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <p className="font-medium text-sm text-white leading-snug line-clamp-2">
          {oeuvre.titre}
        </p>
        <div className="flex items-center justify-between gap-1">
          <StatusBadge statut={oeuvre.statut} />
          <span className="text-xs text-gray-500 shrink-0">
            {mediaLabel[oeuvre.mediaType]}
          </span>
        </div>
      </div>
    </Link>
  );
}
