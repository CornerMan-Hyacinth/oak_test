import { connectDb } from "@/helper/dbConfig";
import { getSession } from "@/helper/sessionActions";
import CustomerModel from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { email, password } = await req.json();

  try {
    await connectDb();

    const customer = await CustomerModel.findOne({ email });

    if (!customer)
      return NextResponse.json({ success: false }, { status: 404 });
    if (customer.password !== password)
      return NextResponse.json({ success: false }, { status: 403 });

    const session = await getSession();
    session.user = {
      id: customer._id,
      name: customer.fullName,
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
