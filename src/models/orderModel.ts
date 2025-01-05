import { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { typee: String, required: true },
    customerPhone: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    recipientPhone: { type: String, required: true },
    sn: { type: String, required: true, unique: true },
    items: [
      {
        productName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        quantity: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
      },
    ],
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
    paymentMethod: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      region: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingCost: { type: Number, default: 0 },
    deliveryDate: { type: Date },
  },
  { timestamps: true }
);

const OrderModel = models.order || model("order", orderSchema);

export default OrderModel;
