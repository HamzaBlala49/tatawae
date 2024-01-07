import { eventRequest,membershipRequest } from "../../models";


const index = async (req, res) => {
    // volunteer
    const user = req.session.user;
    const requests = await membershipRequest.find({volunteer:user._id},{status:0}).populate("foundation");
    const events = await eventRequest.find({volunteer:user._id},{status:0}).populate("foundation");
    res.render("volunteer/membershipRequest",{requests:requests})
}
