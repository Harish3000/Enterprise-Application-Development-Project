import mongoose from "mongoose";
// import { InvoiceNumber } from "invoice-number";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique:true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    Optional: true,
  },
  productDescription: {
    type: String,
    Optional: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productRating: {
    type: Number,
    Optional: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  productStock: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    Optional: true,
  },
  vendorId: {
    type: String,
    Optional: true,
    ref: "Vendors",
  },
});

// Pre-save hook to generate userId (invoice-like number)
// productSchema.pre("save", async function (next) {
//   if (!this.isNew) {
//     return next();
//   }

//   const lastProduct = await this.model("Products")
//     .findOne({})
//     .sort({ _id: -1 })
//     .exec();

//   if (!lastProduct  || !lastProduct.productId) {
//     this.productId = `PRO-0001`; // If no product exist, start with PRO-0001
//   } else {
//     const nextProductId = InvoiceNumber.next(lastProduct.productId); // Increment Id
//     this.productIdId = nextProductId;
//   }

//   next();
// });

export default mongoose.model("Products", productSchema);

