import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Product from "../../lib/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    const body: any = await req.json();

    const product = await Product.create(body); 

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Create Failed" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
