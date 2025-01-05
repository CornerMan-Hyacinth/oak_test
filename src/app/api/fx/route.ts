import { connectFxDb } from "@/helper/dbConfig";
import FXModel from "@/models/fxModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const code = searchParams.get("code");

  try {
    await connectFxDb();

    if (code) {
      const fx = await FXModel.findOne({ code });

      // if the fx was not returned
      if (!fx) {
        // check if there are fxes at all in the database
        const fxes = await FXModel.find();
        // if there are not, return a 200, so as to update the db
        if (fxes.length === 0)
          return NextResponse.json({ success: false }, { status: 200 });

        // if there are, the code is either an error or is not supported. Return a 404
        return NextResponse.json({ success: false }, { status: 404 });
      }

      console.log("FX amount:", fx.amount);

      return NextResponse.json(
        { success: true, amount: fx.amount },
        { status: 200 }
      );
    } else {
      const fx = await FXModel.find();
      return NextResponse.json({ success: true, fx }, { status: 200 });
    }
  } catch (error) {
    console.error("Error getting fx price:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();

  try {
    await connectFxDb();
    await FXModel.create(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
