import { event,eventRequest,foundation, volunteer } from "../../models/index.js";



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
    res.render("foundation/addEvent")
}

// ===================================

const find = async (req,res) =>{
    try{
        const user = req.session.user;
        const data = await event.findOne({_id:req.params.id,foundationId:user._id}).populate("volunteers.volunteerId");
        res.render("foundation/eventInfo",{data});
        // res.json(data);

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

const evaluationPage = async (req,res) =>{
    try{
        const user = req.session.user;
        const {eId,vId} = req.params;

        const data =  await volunteer.findOne({_id:vId}).select("avatar username");
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

const evaluation = async (req,res) =>{
    try{
        const user = req.session.user;
        const {eId,vId} = req.params;
        const {review,attendance,cooperation,interaction,compliance,initiative} = req.body;
        // console.log(id,data);

        const volunteerInEvent = await event.findOne({"volunteers.volunteerId":vId});

        volunteerInEvent.volunteers.forEach( volunteer => {
            if(volunteer.volunteerId == vId){
                volunteer.review = review;
                volunteer.rating = {
                    attendance,
                    cooperation,
                    interaction,
                    compliance,
                    initiative,
                };
            }
        
        })

        await  volunteerInEvent.save();
        res.redirect(`/foundation/events/${eId}/members`);

    }catch(e){
        console.log(e);
    }

}

const invitePage = async (req,res) =>{
    const user = req.session.user;
    const data = await foundation.findOne({_id:user._id}).select("memberShips").populate("memberShips");
    console.log(data)
    res.render("foundation/eventInvite",{data});

}

const invitation = async (req,res)=>{
    const user = req.session.user;
    const {volunteerId,eventId} = req.body;
    console.log(req.body);

    const volunteer =  await eventRequest.findOne({volunteer:volunteerId,event:eventId,foundation:user._id,status:0,sender:0});
    if(volunteer == null){
        const requests = await eventRequest.create({foundation:user._id,volunteer:volunteerId,event:eventId,status:0,sender:0});
        res.status(200).json({msg:"created"});
        
    }else{
        res.status(200).json({msg:"already exist"});

    }

}

const eventMembers = async (req,res) =>{
    const user = req.session.user;
    const id = req.params.id;
    let data = await event.findOne({_id:id,foundationId:user._id}).select("volunteers title image").populate("volunteers.volunteerId");
    const filterList = []
    // "volunteers.rating":{ $exists: false }
    data.volunteers.forEach((volunteer)=>{
        if(volunteer.rating.attendance == undefined){
            filterList.push(volunteer)
        }
    });

    data = {
        _id:data._id,
        title:data.title,
        image:data.image,
        volunteers:filterList,
    }
    console.log(data);
    
    res.render("foundation/eventMembers",{data});

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
    evaluationPage,
    addVolunteer,
    invitePage,
    invitation,
    eventMembers,
    evaluation
}