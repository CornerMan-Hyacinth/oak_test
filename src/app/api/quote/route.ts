import { connectDb } from "@/helper/dbConfig";
import { getSession } from "@/helper/sessionActions";
import QuoteModel from "@/models/quoteModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const session = await getSession();
  const { isLoggedIn } = session;

  try {
    let quotes: any[] = [];

    if (isLoggedIn === "yes") {
      const { id } = session.user;
      quotes = await QuoteModel.find({ customerId: id });
    } else {
      const { guestId } = session;
      quotes = await QuoteModel.find({ guestId });
    }

    return NextResponse.json({ success: true, quotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();
  const session = await getSession();
  const { isLoggedIn } = session;

  try {
    await connectDb();

    const sn = await generateSn();
    let totalAmount = 0;

    data.items.map((item: any) => (totalAmount += item.amount));

    if (isLoggedIn === "yes") {
      const { id } = session.user;
      await QuoteModel.create({ customerId: id, totalAmount, ...data });
    } else {
      const { guestId } = session;
      await QuoteModel.create({ guestId, totalAmount, ...data });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

const generateSn = async () => {
  let isTrue = true;

  while (isTrue) {
    const randomNumber = Math.floor(Math.random() * 999999) + 1;
    const randomSn = `#${randomNumber.toString().padStart(6, "0")}`;

    const product = await QuoteModel.findOne({ sn: randomSn });
    if (!product) {
      isTrue = false;
      return randomSn;
    }
  }
};
