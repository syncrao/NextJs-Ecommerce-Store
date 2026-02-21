import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import Inventory from "@/app/lib/models/Inventory";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const items = await Inventory.find({ productId: id });

  return NextResponse.json(items);
}