"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const tagsRaw = (fd.get("tags") as string).trim();
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const res = await fetch("/api/oeuvres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: fd.get("titre"),
        mediaType: fd.get("mediaType"),
        statut: fd.get("statut"),
        tags,
      }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(
        data.error?.fieldErrors?.titre?.[0] ?? "Erreur lors de l'ajout."
      );
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          ← Retour
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-white mb-6">
        Ajouter une œuvre
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-gray-900 rounded-2xl p-6 border border-gray-800"
      >
        <div>
          <label
            htmlFor="titre"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Titre
          </label>
          <input
            id="titre"
            name="titre"
            type="text"
            required
            className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            placeholder="Ex: One Piece, Dune, Le Seigneur des Anneaux…"
          />
        </div>

        <div>
          <label
            htmlFor="mediaType"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Type
          </label>
          <select
            id="mediaType"
            name="mediaType"
            required
            className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            <option value="MANGA">Manga</option>
            <option value="ROMAN">Roman</option>
            <option value="AUDIO">Livre audio</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="statut"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Statut
          </label>
          <select
            id="statut"
            name="statut"
            defaultValue="A_LIRE"
            className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            <option value="A_LIRE">À lire</option>
            <option value="EN_COURS">En cours</option>
            <option value="STAND_BY">Stand-by</option>
            <option value="TERMINE">Terminé</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Tags{" "}
            <span className="text-gray-500 font-normal">
              (séparés par des virgules)
            </span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            placeholder="Ex: seinen, shonen, fantasy"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-950/50 border border-red-800 rounded-lg px-3.5 py-2.5">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition-colors"
          >
            {loading ? "Ajout…" : "Ajouter"}
          </button>
          <Link
            href="/"
            className="py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg text-sm transition-colors text-center"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
