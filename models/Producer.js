import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    interactionIds: {
        type: [String],
        default: []
    },
    producerType: {
        type: [{
            name: String,
            typeId: String
        }],
        default: []
    },
    aadharCard: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
    }
    
},
{
    timestamps: true
});

const Producer = mongoose.model("Producer", producerSchema);

export default Producer;
