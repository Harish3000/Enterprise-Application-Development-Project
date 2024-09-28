import mongoose from "mongoose";
import { InvoiceNumber } from "invoice-number";

const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: String,
    unique: true
  },
  vendorName: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    Optional: true
  },
  vendorRank: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

// Pre-save hook to generate userId (invoice-like number)
vendorSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const lastVendor = await this.model("Vendors")
    .findOne({})
    .sort({ _id: -1 })
    .exec();

  if (!lastVendor  || !lastVendor.vendorId) {
    this.vendorId = `VEN-0001`; // If no vendor exist, start with PRO-0001
  } else {
    const nextVendorId = InvoiceNumber.next(lastVendor.vendorId); // Increment Id
    this.vendorIdId = nextVendorId;
  }

  next();
});

export default mongoose.model("Vendors", vendorSchema);
