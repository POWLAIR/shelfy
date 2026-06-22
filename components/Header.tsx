import Link from "next/link";
import { signOut } from "@/lib/auth";

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl tracking-tight">
          Shelfy
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/add"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Ajouter
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
