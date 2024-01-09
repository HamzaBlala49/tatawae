import { event } from "../../models/index.js";



const index = async (req, res) => {
    try{
        const user = req.session.user;
        const events = await event.find({foundationId:user._id,status:0}).select("title startDate endDate volunteers");
        res.render('foundation/events', { events });
    }catch(e){
        console.log(e);
    }
    

};

const create = async (req, res) => {
    // const user = req.session.user
    // const myVolunteer = await foundation.find({_id:user.id}).select("memberShips").populate("memberShips");
    res.render("foundation/addEvent")
}

// ===================================

const find = async (req,res) =>{
    try{
        const user = req.session.user;
        const eventInfo = await event.findOne({_id:req.params.id,foundationId:user._id}).populate("volunteers");
        res.render("foundation/eventInfo",{data:eventInfo});

    }catch(e){
        console.log(e);
    }
    

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
    res.redirect("/foundation/events");
}
 

const deleteMasge = async (req,res) =>{
    const user = req.session.user;
    try{
        const eventInfo = await event.findOne({_id:req.params.id,foundationId:user._id});
        res.render("foundation/eventDelete",{data:eventInfo});
    }catch(e){
        console.log(e);
    }

}

const deleteEvent = async (req,res) =>{
    try{
        const id = req.body.id
        await event.findByIdAndDelete(id,{status:1});
        res.redirect("/foundation/events");
    }catch(e){
        console.log(e);
    }
  
}

const edit = async (req,res) =>{
    try{
        const user = req.session.user;
        const id = req.params.id;
        const newEvent = await event.findOne({_id:req.params.id,foundationId:user._id});
        
        const date = Date.now();
        const startDate = new Date(newEvent.startDate);
        
        if( newEvent.volunteers.length > 0 || date >= startDate.getTime()){
            res.redirect("/foundation/events")
        }else{
            res.render("foundation/editEvent",{data:newEvent});
        }
    }catch(e){
        console.log(e);
    }
   
}

const update = async (req,res) =>{
    try{
        const id = req.params.id;
        const user = req.session.user;
        const data = req.body;

        if(req.file){
            data.image = req.file.newImage.filename;
        }

        await event.findByIdAndUpdate(id,data);
        res.redirect("/foundation/events");

    }catch(e){
        console.log(e);
    }
    

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