import { eventRequest } from "../../models/index";

const inviteFoundation = async (req, res) => {
  user = req.session.user;
  const { eventId, volunteerId } = req.body;
  const invite = await eventRequest.create({
    foundation: user_id,
    volunteer: volunteerId,
    event: eventId,
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
    sender:1
  });
  return res.status(200).json(invite);

}

const action = async (req, res) => {
  const { eventId, userId, status } = req.body;
  const invite = await eventRequest.findOne({ eventId, userId });
  invite.status = status;
  await invite.save();
  return res.status(200).json(invite);
};

export {};
