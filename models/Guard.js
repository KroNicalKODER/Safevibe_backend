import mongoose from "mongoose";

const guardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    producer_id: {
        type: String,
        required: true
    },
    streetSmart:{
        type: Boolean,
        default: false
    },
    weapons:{
        type: [String],
        default: []
    },
    combatSkills:{
        type: [String],
        default: []
    },
    combatExperience:{
        type: [String],
        default: []
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

const Guard = mongoose.model("Guard", guardSchema)

export default Guard
