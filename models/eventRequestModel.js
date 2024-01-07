import { Schema, SchemaTypes, model } from "mongoose";


const eventRequestSchema = new Schema({

  foundation:{
    type: SchemaTypes.ObjectId,
    ref: "foundations",
  },

  volunteer: {
    type: SchemaTypes.ObjectId,
    ref: "volunteers",

  },

  event: {
    type: SchemaTypes.ObjectId,
    ref: "events",
    require: true,
  },

  sender: {
    type: Boolean,
    default: 0, // 0 represent foundation
  },

  status: {
    type: Number,
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
