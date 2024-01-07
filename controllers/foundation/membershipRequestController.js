import { membershipRequest,foundation } from "../../models/index.js";

const invite = async (req, res) => {
    const { volunteerId } = req.body;
    console.log(req.body);
    const user = req.session.user;
    const invitation = await membershipRequest.findOne({foundation: user._id,volunteer: volunteerId,status:0});
    console.log(invitation);
    console.log("===========");
    if(!invitation){
        await membershipRequest.create({foundation: user._id,volunteer: volunteerId});
        res.status(201).json({msg:"create invite"})
    }else{
        res.status(200).json({msg:"invite exist"})
    }
}

const action = async (req, res) => {
    const { requestId, status, foundationId } = req.body;
    const user = req.session.user; // volunteer

    await membershipRequest.findByIdAndUpdate(requestId,{status:status});

    if(status === 1){
        await foundation.findByIdAndUpdate({_id:foundationId},{$push:{memberShips:user_id}})
    }
    res.status(200).json({msg:"accept invite"})

}







export {
    invite,
    action,
}