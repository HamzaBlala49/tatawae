import { event,eventRequest,foundation } from "../../models/index.js";



const index = async (req, res) => {
    try{
        const user = req.session.user;
        const events = await event.find({foundationId:user._id,status:0}).select("title startDate endDate volunteers");
        res.render('foundation/events', { events});
    }catch(e){
        console.log(e);
    }
    

};

const create = async (req, res) => {
    const user = req.session.user
    const data = await foundation.findOne({_id:user._id}).select("memberShips").populate("memberShips");
    res.render("foundation/addEvent",{data})
}

// ===================================

const find = async (req,res) =>{
    try{
        const user = req.session.user;
        const data = await event.findOne({_id:req.params.id,foundationId:user._id}).populate("volunteers.volunteerId");
        res.render("foundation/eventInfo",{data});

    }catch(e){
        console.log(e);
    }
    

}





const add = async (req,res) =>{
    const user = req.session.user;
    const {data,invitation} = req.body;

    console.log(data);
    console.log(invitation);
    // data.foundationId = user._id;
    // data.volunteers = [];

    // if(req.file){
    //     data.image = req.file.filename;
    // }

    // const newEvent = await event.create(data)
    
    res.redirect("/foundation/events");

}
 

const deleteMasge = async (req,res) =>{
    const user = req.session.user;
    try{
        const data = await event.findOne({_id:req.params.id,foundationId:user._id});
        const volunteers = await event.findOne({_id:req.params.id,foundationId:user._id}).populate("volunteers.volunteerId");

        res.render("foundation/eventDelete",{data,volunteers});
    }catch(e){
        console.log(e);
    }

}

const deleteEvent = async (req,res) =>{
    try{
        const id = req.body.id
        await event.findByIdAndUpdate(id,{$set:{status:1}});
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
        console.log(data);

        if(req.file){
            data.image = req.file.filename;
        }

        await event.findByIdAndUpdate(id,data);
        res.redirect("/foundation/events");

    }catch(e){
        console.log(e);
    }
}

const evaluation = async (req,res) =>{
    try{
        const user = req.session.user;
        const id = req.params.id;
        const data = await event.findOne({_id:req.params.id,foundationId:user._id}).select("title endDate image volunteers.volunteerId").populate("volunteers.volunteerId");
       
        res.render("foundation/eventEvaluation",{data});
        // if(Date.now() > data.endDate.getTime()){

        // }else{
        //     res.redirect("/foundation/events")
        // }

    }catch(e){
        console.log(e);
    }

}

const addVolunteer = async (req,res) =>{
    const user = req.session.user;
    const vId = '6599a3cb923187cf3f5dba78';
    const id  = '659e3950839366e8d07e83c7';
    // const data = {
    //     volunteerId :vId,
    //     rating :{},
    //     review:""
    // }
    // const e = await event.findOne({_id:id}).select("volunteers").populate("volunteers.volunteerId");
    // console.log(e);
    // await event.findByIdAndUpdate(id,{$push:{volunteers:data}});

    // e.volunteers.push(data);

    // e.save();


    
    // console.log("kjkjkfdjkdjkfkdf");
    // const requests = await eventRequest.create({foundation:user._id,volunteer:vId,event:id,status:0,sender:1});
    // const requests = await eventRequest.find({foundation:user._id,status:1}).populate(["volunteer","event"]);
    // console.log(requests);

    // const user =  req.session.user;

    // const f = await foundation.findOne({_id:user._id}).select("memberShips")
    // f.memberShips.push("6599a3cb923187cf3f5dba78");
    // f.memberShips.push("659a765c2451281668eea9c1");
    // await f.save();

    res.send("add");

}

const evaluationSubmit = async (req,res) =>{
    try{
        const user = req.session.user;
        const id = req.params.id;
        const data = req.body;
        console.log(data);

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
    find,
    evaluation,
    addVolunteer
}