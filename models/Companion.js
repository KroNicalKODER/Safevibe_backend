import mongoose from "mongoose";

const companionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    producer_id: {
        type: String,
        required: true
    },
    reports: {
        type: [String],
        default: []
    },
    ratings: {
        type: Number,
        default: 0
    },
    introVideo: {
        type: String,
        required: false
    },
    primeImage: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false
    }

},
{timestamps: true}
)

const Companion = mongoose.model("Companion", companionSchema)

export default Companion



