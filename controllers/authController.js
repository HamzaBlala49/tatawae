import e from "express";
import { foundation, volunteer } from "../models/index.js";

const login = async (req, res) => {
  res.render("login",{msg:null});
};

const loginUser = async (req, res) => {
  const data = req.body;
  let user ;
  if(data.role == 0){
    user = await foundation.findOne({ username: data.username });
  }else{
    user = await volunteer.findOne({ username: data.username });
  }

  if (user) {
    if (user.password === data.password) {
      req.session.role = data.role;
      req.session.user = user;
      if(data.role == 0){
        res.redirect("/foundation/dashboard");
      }else{
        res.redirect("/volunteer/dashboard");
      }
    } else {
      res.render("login", { msg: "كلمة المرور خاطئة" });
    }
  } else {
    res.render("login", { msg: "اسم المستخدم خاطئ" });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const registerFoundationPage = (req, res) => {
  res.render("foundation/register", { msg: null });
};

const registerFoundation = async (req, res) => {
    const data = req.body;
    data.memberShips = [];

    const foundationData = await foundation.findOne({ username: data.username });
    if (foundationData) {
      res.render("/foundation/register", { msg: "أسم المستخدم موجود بلفعل" });
    } else {
      if (req.files.avatar) {
        data.avatar = req.files.avatar[0].filename;
      }
      if (req.files.coverProfileImage) {
        data.coverProfileImage = req.files.coverProfileImage[0].filename;
      }
      
      const newFoundation = await foundation.create(data);

      if(newFoundation){
        res.redirect("/auth/login");
      }else{
        res.render("/foundation/register", { msg: "حدث خطأ اثناء التسجيل" });
        return;
      }
    }
};

const registerVolunteerPage = (req, res) => {
  res.render("volunteer/register", { msg: null });
}

const registerVolunteer = async (req, res) => {
  const data = req.body;
  data.badges = [];

  const volunteerData = await volunteer.findOne({ username: data.username });
  if (volunteerData) {
    res.render("/volunteer/register", { msg: "أسم المستخدم موجود بلفعل" });
  } else {
    if (req.files.avatar) {
      data.avatar = req.files.avatar[0].filename;
    }
    if (req.files.coverProfileImage) {
      data.coverProfileImage = req.files.coverProfileImage[0].filename;
    }

    const newVolunteer = await volunteer.create(data);

    if(newVolunteer){
      res.redirect("/auth/login");
    }else{
      res.render("/volunteer/register", { msg: "حدث خطأ اثناء التسجيل" });
      return;
    }
  }

}

export {
  login,
  loginUser,
  registerFoundationPage,
  registerFoundation,
  registerVolunteerPage,
  registerVolunteer,
  logout
};
