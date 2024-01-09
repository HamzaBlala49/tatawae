import { Schema, SchemaType, SchemaTypes, model } from "mongoose";

const eventSchema = new Schema({
  foundationId: {
    type: SchemaTypes.ObjectId,
    ref: "foundation",
    required: true,
  },

  title: {
    type: String,
    required: true,
    maxlength: 255,
  },

  image: {
    type: String,
    default: "event.png",
  },

  description: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  googleMapUrl: {
    type: String,
  },

  city: {
    type: String,
    required: true,
    maxlength: 255,
  },

  volunteersNumber: {
    type: Number,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
  
// for sowfet delete
  status: {
    type: Boolean,
    default: 0,
  },

  volunteers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "volunteers",

      rating: {
        type: Number,
        required: true,
      },

      review: {
        type: String,
        maxlength: 255,
      },
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

const event = model("events", eventSchema);

export default event;
