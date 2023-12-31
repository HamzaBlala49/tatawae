const checkRole = (req,res,next)=>{
    if(!req.session.role){
        next();
    }else{
        res.redirect('/login');
    }
}

export default checkRole