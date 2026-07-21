import mongoose from "mongoose"

const canchaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  sport: {
    type: String,
    required: true,
    enum: ["futbol", "padel", "tenis", "basquet"]
  },
  
  description: {
    type: String
  },

  priceHour: {
    type: Number,
    required: true
  },

  images: [{
    type: String
  }],

  disponibility: {
    type: Boolean,
    default: true
  },

  availableSchedule: [{
    day: String,
    start: String,
    end: String
  }],

  complex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complex",
    required: true
  }

})

export default mongoose.model("Court", canchaSchema)