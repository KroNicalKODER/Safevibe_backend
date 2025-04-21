import Companion from "../../models/Companion.js";
import Guard from "../../models/Guard.js";

export const updateCompanion = async(req,res) => {
    const {phone} = req.body;
    //** TODO: If the body contains password, then update the password */
    const companion = await Companion.findOne({phone});
    if(companion){
        companion.update(req.body);
    } else {
        res.send(JSON.stringify({message: "Producer updated failed", code: 400}));
    }
    res.send(JSON.stringify({message: "Producer updated successfully", code: 200}));    
}

export const updateGuard = async(req,res) => {
    const {phone} = req.body;
    const guard = await Guard.findOne({phone});
    if(guard){
        guard.update(req.body);
    } else {
        res.send(JSON.stringify({message: "Producer updated failed", code: 400}));
    }
    res.send(JSON.stringify({message: "Producer updated successfully", code: 200}));
}

