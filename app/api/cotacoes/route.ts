import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const mudancaId = searchParams.get("mudancaId");

    if (!mudancaId) {
      return NextResponse.json(
        { error: "mudancaId is required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const mudanca = await db.mudanca.findFirst({
      where: { id: mudancaId, userId: session.user.id },
    });

    if (!mudanca) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const cotacoes = await db.cotacao.findMany({
      where: { mudancaId },
      include: { transportadora: true, caminhao: true },
      orderBy: { precoCentavos: "asc" },
    });

    return NextResponse.json(cotacoes);
  } catch (error) {
    console.error("GET /api/cotacoes error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
