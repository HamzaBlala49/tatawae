import { event, volunteer, foundation } from "../../models/index.js";


const index = async (req, res) => {
    try {
        const events = await event
          .find({ status: 0 })
          .sort({ createdAt: -1 })
          .limit(5)
          .where("startDate")
          .gt(new Date())
          .populate("foundationId")
          .select("title description image");
    
        const volunteers = await volunteer
          .find({})
          .sort({ points: -1 })
          .limit(10)
          .select("avatar username points");
    
        res.render("foundation/home", { events, volunteers });
      } catch (error) {
          console.log(error);
        res.status(500).json({ msg: error });
      }
}

const search = async (req, res) => {
    try {
      const user =  req.session.user
        const un = req.query.username;
        const users = [];
        const volunteers = await volunteer
          .find({ username: { $regex: un, $options: "i" } })
          .select("username avatar birthDate");
        users.push(...volunteers);
      
        const foundations = await foundation
          .find({ username: { $regex: un, $options: "i" } })
          .select("username avatar");
          
          foundations.forEach(foundation=>{
            if(foundation._id != user._id){
              users.push(foundation);
            }
          })
          
        
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);        
        res.status(500).json({ msg: error });
    }
 
};


export {
    index,
    search
}