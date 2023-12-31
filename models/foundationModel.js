import { Schema, SchemaTypes, model } from "mongoose";


const foundationSchema = new Schema({

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

  policyApproval: {
    type: Boolean,
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

  naturalWork: [
    { 
      type: String,
      maxlength: 255 
    }
  ],

  activityType: [
    { 
      type: String, 
      maxlength: 255 
    }
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


  memberShips: [
    {
      type: SchemaTypes.ObjectId,
      ref: "volunteer",
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
