import { volunteer ,event,foundation} from "../../models/index.js";




const index = async (req, res) => {
    const user  = req.session.user;

    // const volunteers = await volunteer.findById(user._id);
    const events = await event.find({volunteer:user._id}).select("endDate startDate");
    res.json(volunteers);


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