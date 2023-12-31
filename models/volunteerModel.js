import { Schema, SchemaTypes, model } from "mongoose";
const cities = [];
const skills = [];

const volunteerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: 50,
  },

  fullName: {
    type: String,
    required: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    maxlength: 9,
  },

  whatsappPhoneNumber: {
    type: String,
    maxlength: 9,
    required: true,
  },

  birthDate: {
    type: Date,
    required: true,
  },

  city: {
    type: String,
    required: true,
    maxlength: 255,
    validate: {
      validator: function (value) {
        return !cities.includes(value);
      },
      message: "Invalid city",
    },
  },

  policyApproval: {
    type: Boolean,
    required: true,
  },

  skills: [
    {
      type: String,
      maxlength: 255,
    },
  ],

  image: {
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
