import mongoose from "mongoose"

const ReserveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    court: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Court",
        required: true
    },
    complex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complex",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeStart: {
        type: String,
        required: true
    },
    timeEnd: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: [
            "pendiente",
            "confirmada",
            "cancelada",
            "finalizada"
        ],
        default: "confirmada"
    }
}, {
    timestamps: true
})

export default mongoose.model("Reservation", ReserveSchema)