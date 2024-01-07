import { event,foundation } from "../../models/index";

const index = async (req, res) => {
    const user = req.session.user;
    const events = await event.find({_id:user._id});
    res.render('foundation/events', { events });

};

const create = async (req, res) => {
    const user = req.session.user
    const myVolunteer = await foundation.find({_id:user.id}).select("memberShips").populate("memberShips");
    res.render("foundation/addEvent")
}

const add = async (req,res) =>{
    const user = req.session.user;
    const {title,gender,city,googleMapUrl,volunteersNumber,startDate,endDate} = req.body.event
}