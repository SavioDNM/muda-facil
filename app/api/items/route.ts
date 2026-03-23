import { NextResponse } from "next/server";
import { CATALOG_ITEMS } from "@/lib/items-catalog";

export async function GET() {
  return NextResponse.json(CATALOG_ITEMS);
}
