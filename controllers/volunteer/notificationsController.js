import {
  eventRequest,
  membershipRequest,
  foundation,
  event,
  volunteer,
} from "../../models/index.js";

const index = async (req, res) => {
  try {
    const user = req.session.user;
    const eventReq = await eventRequest
      .find({ volunteer: user._id, sender: 0, status: 0 })
      .populate("event foundation");
    const membershipReq = await membershipRequest
      .find({ volunteer: user._id, status: 0 })
      .populate("foundation");

    const data = eventReq.concat(membershipReq).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.render("volunteer/notifications", { data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const actionToEvent = async (req, res) => {
  try {
    const { requestId, status, eventId } = req.body;
    const user = req.session.user; // volunteer

    await eventRequest.findByIdAndUpdate(requestId, { status: status });

    if (status === 1) {
      const data = await event.findByIdAndUpdate({ _id: eventId });
      data.volunteers.push({
        volunteerId: user._id,
        rating: {},
        review: "",
      });
      await data.save();

      // points
      const _volunteer = await volunteer.findById(user._id);
      _volunteer.points += 2;

      //badges
      const events = await event.find({ "volunteers.volunteerId": user._id });
      if (events.length >= 10) {
        if (!_volunteer.badges.includes("65a3a9cfb3cb63028f79edc4")) {
          _volunteer.badges.push("65a3a9cfb3cb63028f79edc4");
        }
      }

      await _volunteer.save();

      res.status(200).json({ msg: "volunteer in event" });
    }
    res.status(200).json({ msg: "accept invite" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const actionToMembership = async (req, res) => {
  try {
    const { requestId, status, foundationId } = req.body;
    const user = req.session.user; // volunteer

    await membershipRequest.findByIdAndUpdate(requestId, { status: status });

    if (status == 1) {
      await foundation.findByIdAndUpdate(
        { _id: foundationId },
        { $push: { memberShips: user._id } }
      );

      // points
      const _volunteer = await volunteer.findById(user._id);
      _volunteer.points += 3;

      // badges
      const foundations = (await foundation.find({})).splice("memberShips");
      let counter = 0;

      foundations.forEach((foundation) => {
        if (foundation.memberShips.includes(user._id)) {
          counter++;
        }
      });

      if (counter >= 5) {
        if (!_volunteer.badges.includes("65a3a9cfb3cb63028f79edc6")) {
          _volunteer.badges.push("65a3a9cfb3cb63028f79edc6");
        }
      }

      await _volunteer.save();
    }
    res.status(200).json({ msg: "accept invite" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const checkRequests = async (req, res) => {
  try {
    const user = req.session.user;
    const eventReq = await eventRequest
      .find({ volunteer: user._id, sender: 0, status: 0 })
      .select("_id");
    const membershipReq = await membershipRequest
      .find({ volunteer: user._id, status: 0 })
      .select("_id");
    const data = eventReq.concat(membershipReq).length;
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export { index, actionToEvent, actionToMembership , checkRequests };
