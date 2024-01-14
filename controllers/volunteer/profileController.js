import e from "express";
import { volunteer ,event,foundation} from "../../models/index.js";




const index = async (req, res) => {
    const user  = req.session.user;

    // const volunteers = await volunteer.findById(user._id);
    const events = await event.find({"volunteers.volunteerId":user._id}).select("title image volunteers endDate startDate").where("endDate").lte(new Date()).populate("foundationId");

    let volunteeringDays = 0 ;

    events.forEach(event => {
        volunteeringDays += (event.endDate - event.startDate) / (1000 * 60 * 60 * 24);
    })

    const _foundation = await foundation.find({memberShips:{$in:[user._id]}}).select("fullName avatar");
    
    const data = await volunteer.findById(user._id).populate("badges");

    
    res.render("volunteer/profile",{events,foundation:_foundation,volunteeringDays,data});


}

const edit = async (req, res) => {
    const user  = req.session.user;
    const data = await volunteer.findById(user._id);
    res.render("volunteer/editProfile",{data});

}

const update = async (req, res) => {
    const user = req.session.user
    const data  = req.body;
    
    if(req.files.newAvatar){
        data.avatar = req.files.newAvatar[0].filename
    }
    if(req.files.newCoverProfileImage){
        data.coverProfileImage =  req.files.newCoverProfileImage[0].filename
    }
    try {
         await volunteer.findByIdAndUpdate(user._id, data); 
        res.redirect("/foundation/profile");
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}


export {index,edit,update};