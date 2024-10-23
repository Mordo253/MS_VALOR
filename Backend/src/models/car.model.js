import mongoose from "mongoose";

// Cloudinary image schema
const cloudinaryImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  resource_type: { type: String, required: true, enum: ['image', 'video', 'raw', 'auto'] },
});
 

const carSchema = new mongoose.Schema({
//   title:{ type: String, required: true  },
  car:{type: String, require:true},
  price: { type: Number, required: true },
  kilometer: { type: Number, required: true },
  color: { type: String, required: true },
  registrationYear: { type: String, required: true },
  change: { type: String, required: true },
  tractionType: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: Number, required: true },
  place: { type: Number, required: true },
  door: { type: Number, required: true },
  fuel: { type: String, required: true },
  description:{ type: String, required: true},
  images: { type: [cloudinaryImageSchema], default: [] },
  imageLimit: { type: Number, default: 15 }
}, {
  timestamps: true,
});

// Export the model
export default mongoose.model("Car", carSchema);