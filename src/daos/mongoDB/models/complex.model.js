import mongoose from "mongoose"

const ComplexSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    direction: {
      type: String,
      required: true,
      trim: true,
    },

    ubication: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    images: [
      {
        type: String,
      },
    ],

    services: [
      {
        type: String,
      },
    ],

    startSchedule: {
      type: String,
    },

    endSchedule: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Complex", ComplexSchema)
