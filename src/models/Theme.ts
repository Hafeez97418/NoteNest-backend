import mongoose, { Schema } from "mongoose";

const { Types } = Schema;
const ThemeSchema = new Schema({
  color: { type: Types.String, required: true },
  name: { type: Types.String, required: true },
});

const Theme = mongoose.model("Theme", ThemeSchema);

export default Theme;