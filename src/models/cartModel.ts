import { model, models, Schema } from "mongoose";

const cartScheme = new Schema(
  {
    customerId: { type: String },
    guestId: { type: String },
    productName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    isCart: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const CartModel = models.cart || model("cart", cartScheme);

export default CartModel;
