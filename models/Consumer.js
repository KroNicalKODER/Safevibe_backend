import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    membership: {
        type: String,
        default: "free"
    },
    
}, {timestamps: true});

const Consumer = mongoose.model("Consumer", consumerSchema);

export default Consumer;
