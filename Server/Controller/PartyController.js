import PartyModel from "../Model/PartyModel.js";

export const addParty = async(req,res)=>
{
    try {
        const {name,imageUrl} = req.body;
        if(name && imageUrl)
        {
            const newParty = new PartyModel(req.body);
            await newParty.save();
            res.send({
                status:"succes",
                message:"saved Party",
                data:newParty,
            })
        }
        else
        {
            res.send({
                status:"error",
                message:"All fields required"
            })
        }
        

    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
    }
}
export const getAllParty = async(req,res)=>
{
    try {
        const partys = await PartyModel.find({});
        res.send({
            status:"succes",
            message:"all party fetched",
            data:partys,
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
    }
}

export const voteParty = async(req,res)=>
{
    const userWhoVotedId = req.user._id;
    const {id} = req.body;   //party id
    try {
        const party = await PartyModel.findById(id);
        party.votes.push(userWhoVotedId);
        await party.save()
        res.send({
            statu:"succes",
            message:"voted",
        })
    } catch (error) {
        res.send({
            status:"error",
            message:error.message,
        })
        
    }
    
}
export const topParty = async(req,res)=>
{
    try {
        const allParty = await PartyModel.find({});
        const party = [...allParty];
        party.sort((a,b)=>
        {
            return  b.votes.length - a.votes.length
        })
        res.send({
            statu:"succes",
            message:"top party list",
            data:party,
        })

    } catch (error) {
        res.send({
            statu:"error",
            message:"something went wrong"
        })
    }
}