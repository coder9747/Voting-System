import mongoose from "mongoose";
const partySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
        require:true,
    },
    votes:{
        type:Array,
        default :[]
    }
})
const PartyModel = mongoose.model("party",partySchema);
export default PartyModel