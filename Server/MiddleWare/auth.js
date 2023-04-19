import UserModel from "../Model/UserMode.js";
import jwt from "jsonwebtoken"

const auth = async(req,res,next)=>
{
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer"))
    {
        try {
            const token = authorization.split(" ").at(1);
            const payload =  jwt.verify(token,process.env.key);
            const user = await UserModel.findById(payload.userId);
            if(user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.send({
                    status:"error",
                    message:"unauthorized",
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
            message:"unauthorized"
        })
    }
}

export default auth;