import UserModel from "../Model/UserMode.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const client = twilio("ACef06077d4ed0dedf7032ffc8cc5d19de","93025a823adf2b22d6bdf17d04024566");

export const registerUser = async(req,res)=>
{
  
    const {username,password,number} = req.body;
    
    if(username && password && number)
    {
        try {
            const isUsernameExits = await UserModel.findOne({username:username});
            // const isNumberExits = await UserModel.findOne({number:number});
            if(!isUsernameExits)
            {
                //hashing password 
                const hashPassword = await bcrypt.hash(password,10);
                //registering user
                const user = new UserModel({...req.body,password:hashPassword});
                await user.save();
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
                    message:`username already registered `,
                })
            }

        } catch (error) {
            console.log(error)
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

export const loginUser = async(req,res)=>
{
    const {username,password} = req.body;
    if(username && password)
    {
        const user = await UserModel.findOne({username:username});
        if(user)
        {
            //comparing password 
            const isPasswordCorrect = await bcrypt.compare(password,user.password);
            if(isPasswordCorrect)
            {
                //generating token
                const token =  jwt.sign({userId:user._id},process.env.key,{expiresIn:"1d"});
                res.send({
                    status:'succes',
                    message:"user login succes",
                    token:token,
                })

            }
            else
            {
                res.send({
                    status:"error",
                    message:"incorrect password"
                    
                })
            }

        }
        else
        {
            res.send({
                status:'error',
                message:"username not registered"
            })
        }

    }
    else
    {
        res.send({
           status:"error",
           message:"All Fields Required"
        })
    }
}




