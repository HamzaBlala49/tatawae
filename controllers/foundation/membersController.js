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
  } catch (e) {
    console.log(e.massage);
    res.status(500).json({msg:e})
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const newVolunteer = await volunteer.findById(id).select("fullName avatar");
    res.render("foundation/deleteMember", { volunteer: newVolunteer });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:error})
  }
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
    res.status(500).json({msg:e})
  }
};

export { index, remove, distorted };
