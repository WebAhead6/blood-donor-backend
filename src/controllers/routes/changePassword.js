const { firebase, admin } = require("../../database")
const apiResponse = require("../../models/apiResponse")

exports.get = (req, res) => {
    res.render("changePassword", {
        selectedNavbarItem: 'changePassword'

    });
}

exports.post = (req, res) => {
    const  password = req.body.password;
    const confirmPassword = req.body.confirmPassword
    console.log(password);
    if (password !== confirmPassword)
    return apiResponse(res,{message: "Passwords not match",code:500});
    // let idToken;
    const sessionCookie = req.cookies.session || '';
    admin.auth().verifySessionCookie(
        sessionCookie, true)
        .then((decodedClaims) => {
         return admin.auth().updateUser(decodedClaims.uid,{
             password
         }) 
        })

            .then(() => 
            apiResponse(res,{message:"updated successfully"}))  
            .catch(({message}) => apiResponse(res,{message,code:500}))};
            
