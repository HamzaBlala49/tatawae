import {foundation,event} from "../../models/index.js"

const index = async (req, res) => {
    try {
        const user = req.session.user
        const data = await foundation.findById(user._id).populate("memberShips");
        const events = await event.find({foundationId:user._id,status:1});
        console.log(data);
        res.render("foundation/profile",{data,events})
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

const find = async (req, res) => {
    try {
        const data = await foundation.findById(req.params.id).populate("memberShips");
        const events = await event.find({foundationId:req.params.id,status:1});
        res.render("foundation/profile", {data,events})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

const edit = async (req, res) => {
    const user = req.session.user
    try {
        const data = await foundation.findById(user._id);
        res.render("foundation/editProfile",{data});
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
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
        const updateFoundation = await foundation.findByIdAndUpdate(user._id, data); 
        res.redirect("/foundation/profile");
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export {
    index,
    find,
    edit,
    update
}