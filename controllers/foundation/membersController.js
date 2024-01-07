import {
  foundation,
  volunteer,
  membershipRequest,
} from "../../models/index.js";

const index = async (req, res) => {
  const user = req.session.user;
  try {
    const foundationsMember = await foundation
      .findById(user._id)
      .populate("memberShips")
      .select("memberShips");
    res.render("foundation/members", { foundationsMember });
    res.end();
  } catch (e) {
    console.log(e.massage);
  }
  // res.render('foundation/index', {})
};

const remove = async (req, res) => {
  const { id } = req.params;
  const newVolunteer = await volunteer.findById(id).select("fullName avatar");
  res.render("foundation/deleteMember", { volunteer: newVolunteer });
};

const distorted = async (req, res) => {
  const user = req.session.user;
  const { id } = req.params;
  try {
    const deleted = await foundation.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { memberShips: id } },
      { new: true }
    );
    res.status(200).json({ msg: `remove it from ${deleted.fullName}` });
  } catch (e) {
    console.log(e.massage);
  }
};

export { index, remove, distorted };
