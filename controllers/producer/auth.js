import Companion from "../../models/Companion.js";
import Guard from "../../models/Guard.js";
import Producer from "../../models/Producer.js";

export const registerProducer = async(req,res) => {
    const {phone} = req.body;
    const producer_found = await Producer.findOne({phone});
    if(producer_found){
        return res.status(400).json({message: "Producer already exists"})
    } else {
        const producer = await Producer.create({phone});
        if(producer){
            const token = jwt.sign({id: producer._id}, process.env.JWT)
            res.cookie("access_token", token, {
                httpOnly: true,
            }).send(JSON.stringify({message: "Producer registered successfully", code: 200}));
        } else {
            res.send(JSON.stringify({message: "Producer registered failed", code: 400}));
        }   
    }
}

export const loginProducer = async(req,res) => {
    const {phone} = req.body;
    const producer = await Producer.findOne({phone});
    if(!producer){
        return res.status(400).json({message: "Producer not found"})
    } else {
        const token = jwt.sign({id: producer._id}, process.env.JWT)
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(producer)
    }
}

export const registerCompanion = async(req,res) => {
    const {phone, producer_id} = req.body;
    const companion_found = await Companion.findOne({phone});
    if(companion_found){
        const token = jwt.sign({id: companion_found._id}, process.env.JWT)
        res.cookie("access_token", token, {
            httpOnly: true,
        }).send(JSON.stringify({message: "Producer registered successfully", code: 200}));
    }else{
        const companion = await Companion.create({phone, producer_id});
        if(companion){
            const token = jwt.sign({id: companion._id}, process.env.JWT)
            await Producer.findByIdAndUpdate(producer_id, {
                $push: {
                    producerType: {
                        name: "companion",
                        typeId: companion._id
                    }
                }
            })
            res.cookie("access_token", token, {
                httpOnly: true,
            }).send(JSON.stringify({message: "Producer registered successfully", code: 200}));
        }else{
            res.send(JSON.stringify({message: "Producer registered failed", code: 400}));
        }
    }
}

export const loginCompanion = async(req,res) => {
    const {phone} = req.body
    const companion = await Companion.findOne({phone})
    if(!companion){
        return res.status(400).json({message: "Companion not found"})
    }
    const token = jwt.sign({id: companion._id}, process.env.JWT)
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json(companion)
}

export const registerGuard = async(req,res) => {
    const {phone, producer_id} = req.body;
    const guard_found = await Guard.findOne({phone});
    if(guard_found){
        const token = jwt.sign({id: guard_found._id}, process.env.JWT)
        res.cookie("access_token", token, {
            httpOnly: true,
        }).send(JSON.stringify({message: "Producer registered successfully", code: 200}));
    }else{
        const guard = await Guard.create({phone, producer_id});
        if(guard){
            await Producer.findByIdAndUpdate(producer_id, {
                $push: {
                    producerType: {
                        name: "guard",
                        typeId: guard._id
                    }
                }
            })
            const token = jwt.sign({id: guard._id}, process.env.JWT)
            res.cookie("access_token", token, {
                httpOnly: true,
            }).send(JSON.stringify({message: "Producer registered successfully", code: 200}));
        }else{
            res.send(JSON.stringify({message: "Producer registered failed", code: 400}));
        }
    }
}

export const loginGuard = async(req,res) => {
    const {phone} = req.body
    const guard = await Guard.findOne({phone})
    if(!guard){
        return res.status(400).json({message: "Guard not found"})
    }
    const token = jwt.sign({id: guard._id}, process.env.JWT)
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json(guard)
}
