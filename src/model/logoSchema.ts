import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  logo_url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

const Logo = mongoose.models.logos || mongoose.model("logos", logoSchema);

export default Logo;
