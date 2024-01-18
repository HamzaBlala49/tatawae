import { event, eventRequest, volunteer } from "../../models/index.js";

const index = async (req, res) => {
  try {
    const user = req.session.user;
    const data = [];
    const eventRequests = await eventRequest
      .find({ foundation: user._id, sender: 1, status: 0 })
      .populate(["volunteer", "event"]);

    eventRequests.forEach((request) => {
      if (
        new Date().getTime() < new Date(request.event.startDate).getTime() &&
        request.event.volunteersNumber != request.event.volunteers.length
      ) {
        data.push(request);
      }
    });

    res.render("foundation/eventRequests", { data: data });
  } catch (error) {
    console(error);
  }
};

const foundationAction = async (req, res) => {
  try {
    const user = req.session.user;
    const { requestId, eventId, volunteerId, status } = req.body;
    const invite = await eventRequest.findOne({
      _id: requestId,
      foundation: user._id,
    });
    invite.status = status;
    await invite.save();

    if (status == 1) {
      const data = await event.findOne({ _id: eventId });
      data.volunteers.push({ volunteerId, rating: {}, review: "" });
      await data.save();

      // points
      let _volunteer = await volunteer.findById(volunteerId);
      _volunteer.points += 2;

      // badge
      let events = await event.find({
        "volunteers.volunteerId": volunteerId,
      });
      if (events.length >= 10) {
        if (!_volunteer.badges.includes("65a3a9cfb3cb63028f79edc4")) {
          _volunteer.badges.push("65a3a9cfb3cb63028f79edc4");
        }
      }
      await _volunteer.save();
      return res.status(200).json({ msg: "add seccusse" });
    } else {
      return res.status(200).json(invite);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

const checkedRequests = async (req, res) => {
  try {
    const user = req.session.user;
    let data = [];
    const eventsRequests = await eventRequest
      .find({ foundation: user._id, sender: 1, status: 0 })
      .select("_id event")
      .populate("event");

    eventsRequests.forEach((request) => {
      if (
        new Date().getTime() < new Date(request.event.startDate).getTime() &&
        request.event.volunteersNumber != request.event.volunteers.length
      ) {
        data.push(request._id);
      }
    });

    res.status(200).json({ data: data.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export { index, foundationAction, checkedRequests };
