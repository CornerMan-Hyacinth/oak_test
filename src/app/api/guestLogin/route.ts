import { getSession } from "@/helper/sessionActions";
import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse> => {
  const session = await getSession();
  const { isLoggedIn } = session;

  if (!isLoggedIn || isLoggedIn === "no") {
    const { guestId } = session;

    if (session.guestId) {
      return NextResponse.json({ success: true, guestId }, { status: 200 });
    }

    const id = crypto.randomUUID();
    session.guestId = id;
    await session.save();

    return NextResponse.json({ success: true, guestId: id }, { status: 200 });
  } else {
    return NextResponse.json({ success: false }, { status: 200 });
  }
};
