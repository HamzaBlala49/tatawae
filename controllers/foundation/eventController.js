import { event } from "../../models/index.js";
const index = async (req, res) => {
    const user = req.session.user;
    const events = await event.find({foundationId:user._id,status:0}).select("title");
    res.render('foundation/events', { events });

};

const create = async (req, res) => {
    // const user = req.session.user
    // const myVolunteer = await foundation.find({_id:user.id}).select("memberShips").populate("memberShips");
    res.render("foundation/addEvent")
}

// ===================================

const find = async (req,res) =>{
    const user = req.session.user;
    const eventInfo = await event.findOne({_id:req.params.id,foundationId:user._id}).populate("volunteers");

    res.render("foundation/eventInfo",{data:eventInfo});

}





const add = async (req,res) =>{
    const user = req.session.user;
    const data = req.body;
    data.foundationId = user._id;
    data.volunteers = [];

    if(req.file){
        data.image = req.file.filename;
    }

    const newEvent = await event.create(data)
    res.redirect("/foundation/events")
}
 

const deleteMasge = async (req,res) =>{
    const id = req.params.id;
    const myevent = await event.findById(id);
    res.render("foundation/deleteEvent",{myevent})

}

const deleteEvent = async (req,res) =>{
    const id = req.params.id;
    await event.findByIdAndDelete(id,{status:1});
    res.redirect("/foundation/events")
}

const edit = async (req,res) =>{
    const id = req.params.id;
    const data = req.body;
    const newEvent = await event.findById(id).select("volunteers startDate");
    const date = Date.now();
    const startDate = new Date(newEvent.startDate);
    if(volunteer.length > 0 || date >= startDate.getTime()){
        res.render("foundation/editEvent",{msg:"لايمكن التعديل على الحدث"});
    }else{
        await event.findByIdAndUpdate(id,data);
        res.redirect("/foundation/events")
    }
}

const update = async (req,res) =>{
    const id = req.params.id;
    const user = req.session.user;
    const data = req.body;
    await event.findByIdAndUpdate(id,data);
    res.redirect("/foundation/events");

}

export{
    index,
    create,
    add,
    deleteMasge,
    deleteEvent,
    edit,
    update,
    find
}