import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createMudancaSchema } from "@/lib/validations";
import { checkUsageLimit } from "@/lib/subscription";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mudancas = await db.mudanca.findMany({
      where: { userId: session.user.id },
      include: { caminhao: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(mudancas);
  } catch (error) {
    console.error("GET /api/mudancas error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check plan limits
    const activeMudancas = await db.mudanca.count({
      where: {
        userId: session.user.id,
        status: { in: ["RASCUNHO", "COTANDO", "CONFIRMADA"] },
      },
    });

    const limit = checkUsageLimit(
      session.user.plan,
      "maxMudancasAtivas",
      activeMudancas
    );

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Limite de mudanças ativas atingido", limit: limit.limit },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = createMudancaSchema.parse(body);

    const mudanca = await db.mudanca.create({
      data: {
        userId: session.user.id,
        enderecoOrigem: parsed.enderecoOrigem,
        enderecoDestino: parsed.enderecoDestino,
        dataDesejada: parsed.dataDesejada
          ? new Date(parsed.dataDesejada)
          : undefined,
      },
    });

    return NextResponse.json(mudanca, { status: 201 });
  } catch (error) {
    console.error("POST /api/mudancas error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
