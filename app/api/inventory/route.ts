import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/app/lib/db";
import Inventory from "@/app/lib/models/Inventory";


export async function GET() {
  await connectDB();
  const items = await Inventory.find().populate("productId");
  return NextResponse.json(items);
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await connectDB();
  const body = await req.json();

  const item = await Inventory.create(body);

  return NextResponse.json(item, { status: 201 });
}