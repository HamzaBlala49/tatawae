const checkRole = (role, req, res, next) => {
    console.log(req.session.role);
  if (req.session.role == role) {
    if (req.session.role === undefined) {
        res.redirect("/");
    } else {
        next();
    }
  } else {
    res.redirect("/");
  }
};

export default checkRole;
