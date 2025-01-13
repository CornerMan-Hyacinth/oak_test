import { getSession } from "@/helper/sessionActions";
import ShippingAddressModel from "@/models/dsaModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  const session = await getSession();
  const { isLoggedIn } = session;

  if (!isLoggedIn || isLoggedIn === "no") {
    return NextResponse.json({ success: false }, { status: 200 });
  }

  try {
    const { id } = session.user;
    const shippingAddress = await ShippingAddressModel.findOne({
      customerId: id,
    });
    const { _id, createdAt, updatedAt, ...data } = shippingAddress;
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();
  const { id } = (await getSession()).user;

  try {
    const shippingAddress = await ShippingAddressModel.findOne({
      customerId: id,
    });

    if (shippingAddress) {
      await ShippingAddressModel.findByIdAndUpdate(id, { ...data });
    } else {
      await ShippingAddressModel.create({
        customerId: id,
        ...data,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
