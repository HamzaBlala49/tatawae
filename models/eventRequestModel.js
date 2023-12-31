import { Schema, SchemaTypes, model } from "mongoose";


const eventRequestSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },

  volunteer: {
    type: SchemaTypes.ObjectId,
    ref: "volunteer",
    require: true,
  },

  event: {
    type: SchemaTypes.ObjectId,
    ref: "event",
    require: true,
  },

  sender: {
    type: Boolean,
    default: 0, // 0 represent volunteer
  },

  status: {
    type: Number,
    min: 0,
    max: 2,
    default: 0,
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

const eventRequest = model("eventRequests", eventRequestSchema);

export default eventRequest;
