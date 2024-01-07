import { volunteer } from "../../models/index.js";

const search =  async (req, res) => {
    const un = req.query.username;
        const newVolunteer =  await volunteer.find({
            username:{$regex:un,$options:"i"}
        }).select("username avatar")
        console.log(un)
        res.status(200).json({data:newVolunteer});
}


export {
    search
};