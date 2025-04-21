import Consumer from "../../models/Consumer.js";

export const register = async (req, res) => {
    const { phone } = req.body;
    const consumer = await Consumer.findOne({ phone });
    if (consumer) {
        return res.status(400).json({ message: "Consumer already exists" });
    }
    const newConsumer = new Consumer(req.body);
    await newConsumer.save();
    res.status(201).json(newConsumer);
}

export const login = async (req, res) => {
    //** TODO: Implement login */
    const {phone} = req.body
    const consumer = await Consumer.findOne({phone})
    if(!consumer){
        return res.status(400).json({message: "Consumer not found"})
    }
    const token = jwt.sign({id: consumer._id}, process.env.JWT)
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json(consumer)
}

