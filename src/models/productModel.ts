import { Schema, model, models } from "mongoose";

const SpecificationSchema = new Schema({
  parameter: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  category: { type: [String] },
  description: { type: String, required: true },
  availability: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
  isFeatured: { type: Boolean, default: false },
  brand: { type: String },
  price: { type: Number, required: true },
  imageUrls: { type: [{ type: String }], required: true },
  videos: { type: [{ type: String }] },
  catalogue: { type: String },
  features: { type: Map, of: String },
  specifications: [SpecificationSchema],
  models: [{ type: String }],
  totalSales: { type: Number, default: 0 },
  ratings: {
    averageRating: { type: Number, default: 0, min: 0, max: 5 }, // Average customer rating
    numberOfRatings: { type: Number, default: 0 }, // Total number of customer ratings
  },
  dateAdded: { type: Date, required: true },
  lastModified: { type: Date, required: true },
});

productSchema.index({ totalSales: -1, dateAdded: -1 });

const ProductModel = models.product || model("product", productSchema);

export default ProductModel;
