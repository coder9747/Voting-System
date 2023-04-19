import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    number:{
        type:String,
        require:true,
        unique:true,
    },  
    isNumberVerified:{
        type:Boolean,
        default:false,
    }
})
const UserModel = mongoose.model("user",UserSchema);
export default UserModel;