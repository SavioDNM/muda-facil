import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateMudancaSchema } from "@/lib/validations";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const mudanca = await db.mudanca.findFirst({
      where: { id, userId: session.user.id },
      include: {
        caminhao: true,
        cotacoes: { include: { transportadora: true, caminhao: true } },
        cargaLayouts: true,
      },
    });

    if (!mudanca) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(mudanca);
  } catch (error) {
    console.error("GET /api/mudancas/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.mudanca.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = updateMudancaSchema.parse(body);

    const mudanca = await db.mudanca.update({
      where: { id },
      data: {
        ...parsed,
        dataDesejada: parsed.dataDesejada
          ? new Date(parsed.dataDesejada)
          : undefined,
      },
    });

    return NextResponse.json(mudanca);
  } catch (error) {
    console.error("PATCH /api/mudancas/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.mudanca.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db.mudanca.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/mudancas/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
