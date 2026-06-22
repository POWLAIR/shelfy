import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CreateOeuvreSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  mediaType: z.enum(["MANGA", "ROMAN", "AUDIO"]),
  statut: z
    .enum(["A_LIRE", "EN_COURS", "TERMINE", "STAND_BY"])
    .default("A_LIRE"),
  tags: z.array(z.string()).default([]),
});

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const oeuvres = await prisma.oeuvre.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return Response.json(oeuvres);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json();
  const parsed = CreateOeuvreSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const oeuvre = await prisma.oeuvre.create({ data: parsed.data });
  return Response.json(oeuvre, { status: 201 });
}
