import { membershipRequest, foundation } from "../../models/index.js";

const invite = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const user = req.session.user;
    const invitation = await membershipRequest.findOne({
      foundation: user._id,
      volunteer: volunteerId,
      status: 0,
    });
    console.log(invitation ==  null);
    if (invitation == null) {
      await membershipRequest.create({
        foundation: user._id,
        volunteer: volunteerId,
      });
      res.status(201).json({ msg: "create invite" });
    } else {
      res.status(200).json({ msg: "invite exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const action = async (req, res) => {

    try {
        const { requestId, status, foundationId } = req.body;
        const user = req.session.user; // volunteer
      
        await membershipRequest.findByIdAndUpdate(requestId, { status: status });
      
        if (status === 1) {
          await foundation.findByIdAndUpdate(
            { _id: foundationId },
            { $push: { memberShips: user._id } }
          );
        }
        res.status(200).json({ msg: "accept invite" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }

 
};

export { invite, action };
