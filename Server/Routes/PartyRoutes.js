import express from "express";
import {addParty,getAllParty,topParty,voteParty} from "../Controller/PartyController.js"
import auth from "../MiddleWare/auth.js";
const partyRouter = express.Router();


partyRouter.post("/add",[auth,addParty]);
partyRouter.get("/getallparty",getAllParty);
partyRouter.put("/vote",[auth,voteParty]);
partyRouter.get("/topparty",[topParty]);













export default partyRouter;