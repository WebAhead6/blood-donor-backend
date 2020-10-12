const { firebase,admin } = require("../../database");
const apiResponse = require("../../models/apiResponse")


exports.get = (req, res) => {
  if (firebase.auth().currentUser) return res.redirect("/");
  res.render("login");
};

exports.post = (req, res) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

      
      firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user =>firebase.auth().currentUser.getIdToken())
    .then(idToken =>
        admin.auth().createSessionCookie(idToken, {expiresIn}))
    .then(sessionCookie=>{
        res.cookie("session",sessionCookie,{maxAge:expiresIn})
        console.log(sessionCookie);
        return firebase.auth().signOut()
    })
    .then(() => apiResponse(res,{message:"successfuly"}))
    .catch(({message}) => apiResponse(res,{message,code:500}))
    ;

} 

exports.isLoggedIn = (req,res) => {
  apiResponse(res, {data: {isLoggedIn:res.locals.signedIn}})


}

exports.logOut =  (req, res) => {
  res.clearCookie('session')
  apiResponse(res,{message:"Logged Out"})
}