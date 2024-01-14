import { event,eventRequest } from "../../models/index.js";


const index = async (req, res) => {
    const events = await event.find({status:0}).where("startDate").gt(new Date())
    .select("title volunteersNumber city image foundationId").populate("foundationId").select({"fullName":1});
    res.render("volunteer/events",{events});

}

const find = async (req,res) =>{
    try{
        const id =  req.params.id;
        const data = await event.findOne({_id:id}).populate("foundationId volunteers.volunteerId");

        res.render("volunteer/eventInfo",{data});
    }catch(e){
        console.log(e)
    }

}

const join = async (req,res) =>{
    try{
        
        const user = req.session.user;
        const {foundation,eventId} = req.body;


        const _event = await event.findById(eventId);

        if(_event.volunteersNumber == _event.volunteers.length || new Date(_event.startDate).getTime() < Date.now()){
            res.status(200).json({msg:"no space"})
        
        }else{
            const volunteer = await eventRequest.findOne({volunteer:user._id,event:eventId,foundation})
            if(volunteer == null || volunteer.status == 2){
                const data = await eventRequest.create({
                    foundation,
                    volunteer:user._id,
                    event:eventId,
                    sender:1
                });
            }
            res.status(201).json({msg:"created"});
        }



    }catch(e){
        console.log(e)
        res.status(500).json({msg:"error"});
    }


}

const eventMember = async (req,res) =>{
    try{       
        const user = req.session.user;
        const data =  await event.find({"volunteers.volunteerId":user._id}).select("title startDate endDate");
        res.render("volunteer/eventMember",{data});
    }catch(e){
        console.log(e)
    }


}

const evaluationInfo = async (req,res) =>{
    try{
        const user = req.session.user;
        const id = req.params.id;
        const data =  await event.findOne({_id:id,"volunteers.volunteerId":user._id}).select("title image volunteers");
        const _data = {
            title:data.title,
            image:data.image,
        }
        data.volunteers.forEach(volunteer => {
            if(volunteer.volunteerId == user._id){
                _data.attendance = volunteer.rating.attendance;
                _data.cooperation = volunteer.rating.cooperation;
                _data.interaction = volunteer.rating.interaction;
                _data.compliance = volunteer.rating.compliance;
                _data.initiative = volunteer.rating.initiative;
                _data.review = volunteer.review;
            }
        })
        // res.json(_data);
        res.render("volunteer/evaluationInfo",{data:_data});
    }catch(e){
        console.log(e)
    }

}

export {
    index,
    find,
    join,
    eventMember,
    evaluationInfo
}