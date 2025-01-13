import { model, models, Schema } from "mongoose";

const shippingAddressSchema = new Schema(
  {
    customerId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const ShippingAddressModel =
  models.shippingAddress || model("shippingAddress", shippingAddressSchema);

export default ShippingAddressModel;
