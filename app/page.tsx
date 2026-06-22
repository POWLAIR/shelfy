import { prisma } from "@/lib/prisma";
import { OeuvreCard } from "@/components/OeuvreCard";
import Link from "next/link";

export default async function HomePage() {
  const oeuvres = await prisma.oeuvre.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {oeuvres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-5xl">📚</span>
          <p className="text-gray-400 text-lg">Votre bibliothèque est vide</p>
          <Link
            href="/add"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Ajouter ma première œuvre
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {oeuvres.map((oeuvre) => (
            <OeuvreCard key={oeuvre.id} oeuvre={oeuvre} />
          ))}
        </div>
      )}
    </div>
  );
}
