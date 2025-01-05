import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subcats: {
      type: [String],
    },
  },
  { timestamps: true }
);

const CategoryModel = models.category || model("category", categorySchema);

export default CategoryModel;
