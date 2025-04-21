import Consumer from "../../models/Consumer.js";
import Interaction from "../../models/Interaction.js";
import Guard from "../../models/Guard.js";
import Companion from "../../models/Companion.js";
import bcrypt from "bcrypt";

export const updateConsumer = async (req, res) => {
    const { phone } = req.body;
    const consumer = await Consumer.findOne({ phone });
    // HASHING AND SALTING PASSWORD
    if(req.user.id !== consumer._id){
        return res.status(400).json({ message: "You are not authorized to update this consumer" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    if (!consumer) {
        return res.status(400).json({ message: "Consumer not found" });
    }
    consumer.update(req.body);
    await consumer.save();
    const token = jwt.sign({ id: consumer._id }, process.env.JWT);

    //remove password from response
    consumer.password = undefined;

    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json(consumer);
}

export const bookGuardInteraction = async (req, res) => {
    const { guardId, city, state, country } = req.body;
    const consumerId = req.user.id;
    if(req.user.id !== consumerId){
        return res.status(400).json({ message: "You are not authorized to book this interaction" });
    }
    const guard = await Guard.findById(guardId);
    if (!guard) {
        return res.status(400).json({ message: "Guard not found" });
    }
    const interaction = new Interaction({
        consumerId,
        producerId: guardId,
        producerType: "guard",
        date: new Date(),
        city,
        state,
        country,
        status: "pending",
        paymentStatus: "pending"
    });
    await interaction.save();
    res.status(200).json(interaction);
}

export const bookCompanionInteraction = async (req, res) => {
    const { companionId, city, state, country } = req.body;
    const consumerId = req.user.id;
    if(req.user.id !== consumerId){
        return res.status(400).json({ message: "You are not authorized to book this interaction" });
    }
    const companion = await Companion.findById(companionId);
    if (!companion) {
        return res.status(400).json({ message: "Companion not found" });
    }
    const interaction = new Interaction({
        consumerId,
        producerId: companionId,
        producerType: "companion",
        date: new Date(),
        city,
        state,
        country,
        status: "pending",
        paymentStatus: "pending"
    });
    await interaction.save();
    res.status(200).json(interaction);
}

export const updateInteractionDuration = async (req, res) => {
    // ** TODO: Implement update interaction duration functionality */
    const { interactionId } = req.body;
    const interaction = await Interaction.findById(interactionId);
    if(req.user.id !== interaction.consumerId){
        return res.status(400).json({ message: "You are not authorized to update this interaction" });
    }
    // CALCULATE THE DURATION OF THE INTERACTION
    const currentDate = new Date();
    const interactionDate = new Date(interaction.date);
    const duration = currentDate.getTime() - interactionDate.getTime();
    const durationInHours = duration / (1000 * 60 * 60);
    interaction.duration = durationInHours;
    await interaction.save();
    res.status(200).json(interaction);
}

