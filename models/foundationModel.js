import { Schema, SchemaTypes, model } from "mongoose";

const foundationSchema = new Schema({
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
 
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email :{
    type: String,
  },
  facebook :{
    type: String,
  },
  instagram:{
    type: String,
  },
  whatsapp:{
    type: String,
  },
  twitter:{
    type: String,
  },

  city: {
    type: String,
    maxlength: 255,
  },
  address :{
    type: String,
    maxlength: 255,

  },

  // activityType: [
  //   {
  //     type: String,
  //     maxlength: 255,
  //   },
  // ],

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

  memberShips: [
    {
      type: SchemaTypes.ObjectId,
      ref: "volunteers",
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

const foundation = model("foundations", foundationSchema);

export default foundation;
