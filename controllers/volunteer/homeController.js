import {event , volunteer , foundation} from "../../models/index.js";


const index = async (req,res) =>{
    const events = await event.find({status:0}).sort({createdAt:-1}).limit(10).where("startDate").gt(new Date()).populate("foundationId").select("title description image");

    const volunteers = await volunteer.find({}).sort({points:1}).limit(10);

    res.render('volunteer/home',{events,volunteers});

};


const search = async (req,res) =>{
    const id  = req.body.id;
    const users = [];
    const volunteer = await volunteer.find({_id:id});
    users.push(...volunteer);

    const foundation = await foundation.find({_id:id});
    users.push(...foundation);

    res.status.json({users})
}





export {
    index,
    search
}