import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
    consumerId: {
        type: String,
        required: true
    },
    //Companion or Guard
    producerId: {
        type: String,
        required: true
    },
    producerType: {
        type: String,
        enum: ["companion", "guard"],
        required: true
    },
    duration: {
        type: Number,
    },
    date: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
        
});

const Interaction = mongoose.model("Interaction", interactionSchema)

export default Interaction
