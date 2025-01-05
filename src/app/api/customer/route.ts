import { connectDb } from "@/helper/dbConfig";
import { getSession } from "@/helper/sessionActions";
import CustomerModel from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const email = searchParams.get("email");

  try {
    await connectDb();

    if (email) {
      const customer = await CustomerModel.findOne({ email });
      return NextResponse.json({ success: true, customer }, { status: 200 });
    }

    const customers = await CustomerModel.find();
    return NextResponse.json({ success: true, customers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();

  try {
    await connectDb();

    const customer = await CustomerModel.create(data);

    const session = await getSession();
    session.user = {
      id: customer._id,
      name: customer.name,
      email: customer.email,
    };
    await session.save();
    session.isLoggedIn = "yes";
    await session.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  const { id, data } = await req.json();

  try {
    await connectDb();

    const customer = await CustomerModel.findByIdAndUpdate(id, data);

    if (!customer)
      return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const id = searchParams.get("id");

  try {
    await connectDb();
    const product = await CustomerModel.findByIdAndDelete(id);

    if (!product) return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
