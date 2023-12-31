import { Schema, SchemaTypes, model } from "mongoose";


const membershipRequestSchema = new Schema({

  volunteerId: {
    type: SchemaTypes.ObjectId,
    ref: "volunteer",
  },

  status: {
    type: Number,
    default: 0,
    min: 0,
    max: 2,
    validate: {
      validator: function (value) {
        return value < 0 || value > 2;
      },
      message: "the rage must be between 0 and 2",
    },
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
