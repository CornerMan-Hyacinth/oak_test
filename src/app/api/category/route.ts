import { connectDb } from "@/helper/dbConfig";
import CategoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const cat = searchParams.get("cat");

  try {
    await connectDb();

    if (cat) {
      const category = await CategoryModel.find();
      return NextResponse.json({ success: true, category }, { status: 200 });
    }

    const cats = await CategoryModel.find();
    return NextResponse.json({ success: true, cats }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
