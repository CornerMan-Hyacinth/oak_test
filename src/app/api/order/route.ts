import { connectDb } from "@/helper/dbConfig";
import OrderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const customerEmail = searchParams.get("customerEmail");

  try {
    await connectDb();

    if (customerEmail) {
      const orders = await OrderModel.find({ customerEmail });
      return NextResponse.json({ success: true, orders }, { status: 200 });
    }

    const orders = await OrderModel.find();
    return NextResponse.json({ sucess: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();

  try {
    await connectDb();

    const orders = await OrderModel.find();
    const sn = `#${(orders.length + 1).toString().padStart(6, "0")}`;

    await OrderModel.create({ ...data, sn, orderDate: new Date() });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  const { id, data } = await req.json();

  try {
    await connectDb();
    const order = await OrderModel.findByIdAndUpdate(id, data);

    if (!order) return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
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
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
