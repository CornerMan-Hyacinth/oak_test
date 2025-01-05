import { Schema, model, models } from "mongoose";

const fxSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FXModel = models.fx || model("fx", fxSchema);

export default FXModel;
