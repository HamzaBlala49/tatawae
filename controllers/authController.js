import e from "express";
import { volunteer, foundation } from "../models/index.js";

const login = async (req, res) => {
  const { role, username, password } = req.body;

  if(!role,!username,!password){
    res.render
  }

  if (role === "volunteer") {

    const volunteerData = await volunteer.findOne({ username: username });

    if (volunteerData) {
      if (volunteerData.password === password) {
        req.session.username = username;
        res.redirect("/volunteer");
        return;
      } else {
        res.render("login", {
          msg: "أنت غير مصرح لك بالدخول تأكد من صحة البيانات المدخله",
        });
      }
    }
  } else if (role === "foundation") {
    const foundationData = await foundation.findOne({ username: username });
    if (foundationData) {
      if (foundationData.password === password) {
        req.session.username = username;
        res.redirect("/foundation");
        return;
      }
    }
  }
  res.render("login");
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const register = (req, res) => {
  res.render("register");
};

export default {
  login,
  logout,
  register,
};
