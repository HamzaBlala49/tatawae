import { volunteer, foundation, event } from "../../models/index.js";

const find = async (req, res) => {
  try {
    const id = req.params.id;
    const eventsData = [];

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

    res.render("foundation/profileVolunteer.ejs", {
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

const search = async (req, res) => {
  try {
    const user = req.session.user;
    const un = req.query.username;
    let data = [];
    const volunteers = await volunteer
      .find({
        username: { $regex: un, $options: "i" },
      })
      .select("username avatar");

    const members = await foundation
      .findOne({ _id: user._id })
      .select("memberShips");

    console.log(members);

    volunteers.forEach((volunteer) => {
      if (!members.memberShips.includes(volunteer._id)) {
        data.push(volunteer);
      }
    });

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

export { search, find };
