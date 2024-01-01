
const login = (req,res) =>{
    res.render('login');
}


const logout = (req,res) =>{
    req.session.destroy()
    res.redirect('/')
}


const register = (req,res) =>{
    res.render('register')
}

export default{
    login,
    logout,
    
}