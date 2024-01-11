import { event, eventRequest } from "../../models/index.js";

const index = async (req, res) => {
  const user = req.session.user;
  try {
    const data = await eventRequest
      .find({ foundation: user._id, sender: 1 , status: 0})
      .populate(["volunteer", "event"]);
    res.render("foundation/eventRequests", { data: data });
  } catch (error) {
    console(error);
  }
};




const invite = async (req, res) => {
  user = req.session.user;
  const { eventId, volunteerId } = req.body;
  const invite = await eventRequest.create({
    foundation: user_id,
    volunteer: volunteerId,
    event: eventId,
    sender: req.session.role
  });
  return res.status(200).json(invite);
};





const requestVolunteer = async (req, res) => {
  user = req.session.user;
  const { eventId, foundationId } = req.body;
  const invite = await eventRequest.create({
    volunteer: user_id,
    foundation: foundationId,
    event: eventId,
    sender: 1,
  });
  return res.status(200).json(invite);
};

const foundationAction = async (req, res) => {
  const user = req.session.user;
  const { requestId, eventId, volunteerId, status } = req.body;
  const invite = await eventRequest.findOne({_id:requestId,foundation:user._id});
  invite.status = status;
  await invite.save();

  if(status == 1){
    const data = await event.findOne({_id:eventId});
    data.volunteers.push({volunteerId,rating:{},review:""})
    await data.save();
    return res.status(200).json({msg:"add seccusse"});
  }else{
    return res.status(200).json(invite);
  }
};



// ======================




export {
   index,
   foundationAction
   };
