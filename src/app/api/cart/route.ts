import { connectDb } from "@/helper/dbConfig";
import { getSession } from "@/helper/sessionActions";
import CartModel from "@/models/cartModel";
import ProductModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const isCart = searchParams.get("isCart");

  const session = await getSession();
  const { isLoggedIn } = session;

  try {
    await connectDb();
    let carts: any[] = [];

    // get items by field: cart/quote
    if (isLoggedIn === "yes") {
      const { id } = session.user;
      carts = await CartModel.find({ id, isCart: !!isCart });
    } else {
      const { guestId } = session;
      carts = await CartModel.find({ guestId, isCart: !!isCart });
    }

    // get similar products (by category and field)
    // get categories && ids
    const cats: string[] = [],
      ids: string[] = [];

    await Promise.all(
      carts.map(async (item) => {
        const product = await ProductModel.findOne({ name: item.productName });
        ids.push(product._id);
        product.category.map((cat: string) => cats.push(cat));
      })
    );
    const uniqueCats = [...new Set(cats)];
    const uniqueIds = [...new Set(ids)];

    // get similar products
    const count = Math.ceil(10 / cats.length);
    const products = uniqueCats.map(async (category: string) => {
      // exclude the products that are already in cart/quote
      const prods = await ProductModel.find({
        _id: { $nin: uniqueIds },
        category,
      });
      const randomNumbers: number[] = [];

      while (randomNumbers.length === count) {
        const randomNumber =
          Math.floor(Math.random() * (prods.length - 1 + 1)) + 1;
        randomNumbers.push(randomNumber);
      }

      const uniqueRand = [...new Set(randomNumbers)];
      return uniqueRand.map((num) => ({ ...prods[num], isAdded: false }));
    });

    return NextResponse.json(
      { success: true, data: { carts, products } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { data } = await req.json();
  const session = await getSession();
  const { isLoggedIn } = session;

  try {
    await connectDb();

    if (isLoggedIn === "yes") {
      const { id } = session.user;
      await CartModel.create({
        customerId: id,
        isCart: true,
        amount: data.price,
        ...data,
      });
    } else {
      const { guestId } = session;
      await CartModel.create({
        customerId: guestId,
        isCart: true,
        amount: data.price,
        ...data,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  const { id, data } = await req.json();

  try {
    await connectDb();
    const cart = await CartModel.findByIdAndUpdate(id, { ...data });

    if (!cart) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const baseUrl = process.env.BASE_URL;
  const { searchParams } = new URL(req.url, baseUrl);
  const id = searchParams.get("id");
  const isAll = searchParams.get("isAll");

  const session = await getSession();
  const { isLoggedIn } = session;

  try {
    await connectDb();

    if (id) {
      const cart = await CartModel.findByIdAndDelete(id);
      if (!cart) return NextResponse.json({ success: false }, { status: 404 });
    }

    if (isAll) {
      let carts: any[] = [];

      if (isLoggedIn === "yes") {
        const { id } = session.user;
        carts = await CartModel.find({ customerId: id });
      } else {
        const { guestId } = session;
        carts = await CartModel.find({ guestId });
      }

      await Promise.all(
        carts.map(async (item) => {
          await CartModel.findByIdAndDelete(item._id);
        })
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
