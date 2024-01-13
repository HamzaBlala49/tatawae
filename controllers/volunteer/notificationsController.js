import { eventRequest,membershipRequest,foundation,event, } from "../../models/index.js";

const index = async (req, res) => {
    const user = req.session.user;
    const eventReq = await eventRequest.find({volunteer:user._id,sender:0,status:0}).populate("event foundation");
    const membershipReq = await membershipRequest.find({volunteer:user._id,status:0}).populate("foundation");

    const data =  eventReq.concat(membershipReq).sort((a,b)=>{
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    // res.json(data);
    res.render("volunteer/notifications",{data});

}










const actionToEvent = async (req, res) => {
    const { requestId, status, eventId } = req.body;
    const user = req.session.user; // volunteer

    await eventRequest.findByIdAndUpdate(requestId,{status:status});

    if(status === 1){
        const data =  await event.findByIdAndUpdate({_id:eventId})
        data.volunteers.push({
            volunteerId:user._id,
            rating:{},
            review:""
        });

        await data.save();
        res.status(200).json({msg:"volunteer in event"})

    }
    res.status(200).json({msg:"accept invite"})

}


const actionToMembership = async (req, res) => {
    const { requestId, status, foundationId } = req.body;
    const user = req.session.user; // volunteer

    await membershipRequest.findByIdAndUpdate(requestId,{status:status});

    if(status === 1){
        await foundation.findByIdAndUpdate({_id:foundationId},{$push:{memberShips:user_id}})
    }
    res.status(200).json({msg:"accept invite"})

}


export {
    index,
    actionToEvent,
    actionToMembership,
}