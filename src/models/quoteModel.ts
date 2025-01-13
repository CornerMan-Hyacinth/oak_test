import { model, models, Schema } from "mongoose";

const ItemProps = {
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
};

const quoteScheme = new Schema(
  {
    customerId: { type: String },
    guestId: { type: String },
    items: { type: [ItemProps], required: true },
    sn: { type: String, required: true, unique: true },
    totalAmount: { type: Number, required: true },
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    recipientPhone: { type: String, required: true },
    recipientLocation: { type: String, required: true },
    recipientMessage: { type: String, required: true },
    requestDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const QuoteModel = models.quote || model("quote", quoteScheme);

export default QuoteModel;
