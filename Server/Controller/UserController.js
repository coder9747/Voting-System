import UserModel from "../Model/UserMode.js";
import twilio from "twilio";

const client = twilio("ACef06077d4ed0dedf7032ffc8cc5d19de","93025a823adf2b22d6bdf17d04024566");

export const registerUser = async(req,res)=>
{
  
    const {username,password,number} = req.body;
    if(username && password && number)
    {
        try {
            const isUsernameExits = await UserModel.findOne({username:username});
            const isNumberExits = await UserModel.findOne({number:number});
            if(!isUsernameExits.isNumberVerified && !isNumberExits.isNumberVerified)
            {
                //registering user
                const user = new UserModel(req.body);
                user.save();
                //generating otp
                let otp = 0;
                for(let i = 0;i<4;i++)
                {
                    otp*=10;
                    otp+=Math.floor(Math.random()*10);
                }
                await client.messages.create({
                    to:"+91"+number,
                    body:otp,
                    from:"+16206440872",
                })
                res.send({
                    status:"succes",
                    message:"verify otp",
                    otp:otp,
                })
            }
            else
            {
                res.send({
                    status:"error",
                    message:`${isNumberExits?"Phone Number Already Registered":"username already registered" }`,
                })
            }

        } catch (error) {
            res.send({
                status:"error",
                message:error.message,
            })
        }

    }
    else
    {
        res.send({
            status:"error",
            message:"All Fileds Required"
        })
    }

}