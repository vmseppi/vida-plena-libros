import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrdersByEmail } from "@/lib/orders";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 200 });
  }

  const orders = await getOrdersByEmail(session.user.email);
  return NextResponse.json(orders);
}
