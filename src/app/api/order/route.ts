import { connectDb } from "@/helper/dbConfig";
import { getSession } from "@/helper/sessionActions";
import OrderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const session = await getSession();
  const { id } = session.user;

  try {
    await connectDb();

    if (session.isLoggedIn === "yes") {
      const orders = await OrderModel.find({ customerId: id });
      return NextResponse.json({ success: true, orders }, { status: 200 });
    }

    const { guestId } = session;
    const orders = await OrderModel.find({ guestId });
    return NextResponse.json({ sucess: true, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();

  try {
    await connectDb();

    const sn = await generateSn();
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

const generateSn = async () => {
  let isTrue = true;

  while (isTrue) {
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    const randomSn = `#${randomNumber.toString().padStart(6, "0")}`;

    const product = await OrderModel.findOne({ sn: randomSn });
    if (!product) {
      isTrue = false;
      return randomSn;
    }
  }
};
