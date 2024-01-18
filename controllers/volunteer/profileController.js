import e from "express";
import { volunteer, event, foundation } from "../../models/index.js";

const index = async (req, res) => {
  try {
    const user = req.session.user;
    const eventsData = [];

    const events = await event
      .find({ "volunteers.volunteerId": user._id })
      .select("title image volunteers endDate startDate")
      .where("endDate")
      .lte(new Date())
      .populate("foundationId");

    let volunteeringDays = 0;

    events.forEach((event) => {
      event.volunteers.forEach((volunteer) => {
        if (volunteer.volunteerId == user._id) {
          volunteeringDays += volunteer.days;
        }
      });
    });

    const _foundation = await foundation
      .find({ memberShips: { $in: [user._id] } })
      .select("fullName avatar");

    const data = await volunteer.findById(user._id).populate("badges");

    events.forEach((event) => {
      event.volunteers.forEach((volunteer) => {
        if (volunteer.volunteerId == user._id) {
          const temp = {};
          temp.title = event.title;
          temp.avatar = event.foundationId.avatar;
          temp.foundationName = event.foundationId.fullName;
          temp.review = volunteer.review;
          temp.evaluate = Math.round(
            (volunteer.rating.attendance +
              volunteer.rating.compliance +
              volunteer.rating.cooperation +
              volunteer.rating.initiative +
              volunteer.rating.interaction) /
              5
          );
          eventsData.push(temp);
        }
      });
    });

    res.render("volunteer/profile", {
      eventsData,
      foundation: _foundation,
      volunteeringDays,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const find = async (req, res) => {
  try {
    const id = req.params.id;
    const eventsData = [];
    console.log(id);

    const events = await event
      .find({ "volunteers.volunteerId": id })
      .select("title image volunteers endDate startDate")
      .where("endDate")
      .lte(new Date())
      .populate("foundationId");

    let volunteeringDays = 0;

    events.forEach((event) => {
      event.volunteers.forEach((volunteer) => {
        if (volunteer.volunteerId == id) {
          volunteeringDays += volunteer.days;
        }
      });
    });

    const _foundation = await foundation
      .find({ memberShips: { $in: [id] } })
      .select("fullName avatar");

    const data = await volunteer.findById(id).populate("badges");

    events.forEach((event) => {
      event.volunteers.forEach((volunteer) => {
        if (volunteer.volunteerId == id) {
          const temp = {};
          temp.title = event.title;
          temp.avatar = event.foundationId.avatar;
          temp.foundationName = event.foundationId.fullName;
          temp.review = volunteer.review;
          temp.evaluate = Math.round(
            (volunteer.rating.attendance +
              volunteer.rating.compliance +
              volunteer.rating.cooperation +
              volunteer.rating.initiative +
              volunteer.rating.interaction) /
              5
          );
          eventsData.push(temp);
        }
      });
    });

    res.render("volunteer/profileVolunteer", {
      eventsData,
      foundation: _foundation,
      volunteeringDays,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const edit = async (req, res) => {
  try {
    const user = req.session.user;
    const data = await volunteer.findById(user._id);
    res.render("volunteer/editProfile", { data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const update = async (req, res) => {
  try {
    const user = req.session.user;
    const data = req.body;

    if (req.files.newAvatar) {
      data.avatar = req.files.newAvatar[0].filename;
    }
    if (req.files.newCoverProfileImage) {
      data.coverProfileImage = req.files.newCoverProfileImage[0].filename;
    }

    await volunteer.findByIdAndUpdate(user._id, data);
    res.redirect("/volunteer/profile");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const findFoundation = async (req, res) => {
  try {
    const data = await foundation
      .findById(req.params.id)
      .populate("memberShips");
    const events = await event.find({ foundationId: req.params.id, status: 0 });
    res.render("volunteer/profileFoundation", { data, events });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { index, edit, update, find, findFoundation };
