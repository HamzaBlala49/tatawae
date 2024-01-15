import {event , volunteer , foundation} from "../../models/index.js";


const index = async (req,res) =>{
    const events = await event.find({status:0}).sort({createdAt:-1}).limit(10).where("startDate").gt(new Date()).populate("foundationId").select("title description image");

    const volunteers = await volunteer.find({}).sort({points:-1}).limit(10).select("avatar username points");

    res.render('volunteer/home',{events,volunteers});

};


const search = async (req,res) =>{
    const un = req.query.username;
    const users = [];
    const volunteers = await volunteer.find({username:{$regex:un,$options:"i"}}).select("username avatar birthDate");
    users.push(...volunteers);

    const foundations = await foundation.find({username:{$regex:un,$options:"i"}}).select("username avatar");
    users.push(...foundations);
    console.log(users);
    res.status(200).json({users})
}





export {
    index,
    search
}