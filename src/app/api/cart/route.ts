import { connectDb } from "@/helper/dbConfig";
import CartModel from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const customerEmail = searchParams.get("customerEmail");

  try {
    await connectDb();

    if (customerEmail) {
      const orders = await CartModel.find({ customerEmail });
      return NextResponse.json({ success: true, orders }, { status: 200 });
    }

    const orders = await CartModel.find();
    return NextResponse.json({ sucess: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();

  try {
    await connectDb();
    await CartModel.create(data);

    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  const { id, data } = await req.json();

  try {
    await connectDb();
    const cart = await CartModel.findByIdAndUpdate(id, data);

    if (!cart) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const id = searchParams.get("id");

  try {
    await connectDb();
    const cart = await CartModel.findByIdAndDelete(id);

    if (!cart) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
