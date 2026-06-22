import type { ReadingStatus } from "@prisma/client";

const labels: Record<ReadingStatus, string> = {
  A_LIRE: "À lire",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  STAND_BY: "Stand-by",
};

const colors: Record<ReadingStatus, string> = {
  A_LIRE: "bg-gray-700 text-gray-300",
  EN_COURS: "bg-blue-900 text-blue-200",
  TERMINE: "bg-green-900 text-green-200",
  STAND_BY: "bg-orange-900 text-orange-200",
};

export function StatusBadge({ statut }: { statut: ReadingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[statut]}`}
    >
      {labels[statut]}
    </span>
  );
}
