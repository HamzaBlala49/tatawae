import { Schema, SchemaType, SchemaTypes, model } from "mongoose";

const eventSchema = new Schema({
  foundationId: {
    type: SchemaTypes.ObjectId,
    ref: "foundations",
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
      volunteerId: {
        type: SchemaTypes.ObjectId,
        ref: "volunteers",
      },

      rating: {
        attendance: {
          type: Number,
        },

        cooperation: {
          type: Number,
        },

        interaction: {
          type: Number,
        },

        compliance: {
          type: Number,
        },

        initiative: {
          type: Number,
        },
      },

      review: {
        type: String,
      },

      days: {
        type: Number,
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
