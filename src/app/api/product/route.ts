import { connectDb } from "@/helper/dbConfig";
import ProductModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const top = searchParams.get("top");
  const subcat = searchParams.get("subcat");

  try {
    await connectDb();

    if (id) {
      const product = await ProductModel.findById(id);
      return NextResponse.json({ success: true, product }, { status: 200 });
    }

    if (name) {
      const product = await ProductModel.findOne({ name });
      return NextResponse.json({ success: true, product }, { status: 200 });
    }

    if (top) {
      const products = await ProductModel.find({})
        .sort({ totalSales: -1 })
        .limit(parseInt(top));
      return NextResponse.json({ success: true, products }, { status: 200 });
    }

    if (subcat) {
      const products = await ProductModel.find({
        category: subcat.toLowerCase(),
      }).sort({
        dateAdded: -1,
      });
      return NextResponse.json({ success: true, products }, { status: 200 });
    }

    const products = await ProductModel.find();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
