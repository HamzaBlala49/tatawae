import { Schema, SchemaTypes, model } from "mongoose";


const membershipRequestSchema = new Schema({

  volunteerId: {
    type: SchemaTypes.ObjectId,
    ref: "volunteer",
  },

  // 0: pending, 1: accepted, 2: rejected
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

const membershipRequest = model("membershipRequests", membershipRequestSchema);

export default membershipRequest;
