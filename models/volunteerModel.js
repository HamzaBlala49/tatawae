import { Schema, SchemaTypes, model } from "mongoose";
const volunteerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 255,
  },

  fullName: {
    type: String,
    required: true,
    maxlength: 255,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  whatsapp: {
    type: String,
    maxlength: 9,
    required: true,
  },

  birthDate: {
    type: Date,
  },

  city: {
    type: String,
    maxlength: 255,
  },

  
  avatar: {
    type: String,
    default: "user.png",
  },

  coverProfileImage: {
    type: String,
    default: "coverProfile.png",
  },

  description: {
    type: String,
  },

  points: {
    type: Number,
  },

  badges: [
    {
      type: SchemaTypes.ObjectId,
      ref: "badges",
    },
  ],

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

const volunteer = model("volunteers", volunteerSchema);

export default volunteer;
