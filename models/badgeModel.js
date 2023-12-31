import { Schema, model } from "mongoose";


const badgeSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },

  description: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },

  updateAt: {
    type: Date,
    default: new Date(),
  },
});

const badge = model("badges", badgeSchema);

export default badge;
