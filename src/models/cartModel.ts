import { model, models, Schema } from "mongoose";

const cartScheme = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    quantity: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartModel = models.cart || model("cart", cartScheme);

export default CartModel;
