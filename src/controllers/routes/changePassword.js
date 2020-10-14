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
       
 
       const sessionCookie = req.cookies.session || '';
       admin.auth().verifySessionCookie(
           sessionCookie, true)
        
        .then(user=> firebase.auth().onAuthStateChanged(user=> {
            if (user) {
                return user.getIdToken()
            }
            return null;
        }))
        
        // .then(user =>firebase.auth().currentUser.getIdToken(user,true))
       .then(idToken => 
        //admin.auth???
           admin.auth.updateUser(idToken,{password:'newPassword2'}))
       .then(newPassword =>
           setPassword(newPassword))
       .then(() => 
           apiResponse(res,{message:"updated successfully"}))  
       .catch(({message}) => apiResponse(res,{message,code:500}))};
            

//     firebase.auth().updateUser(uid,{password: 'newPassword'})
//         .then(userRecord => 
//             console.log("updated successfully", userRecord.toJSON())
//     )
//     .then(() => apiResponse(res,{message:"successfuly"}))
//         .catch(e => res.render("changePassword", {
//             error: e.message,
//         }))
// }



// exports.post = (req, res) => {
//     const { password, confirmPassword } = req.body;
//     if (password !== confirmPassword)
//         return res.render("changePassword",
//             {
//                 error: "passwords do not match",
//                 selectedNavbarItem: 'changePassword'
//             }
//         );

//     firebase.auth().currentUser.updatePassword(password)
//         .then(() => res.render("changePassword", {
//             message: "updated successfully",
//             selectedNavbarItem: 'changePassword'
//         }))
//         .catch(e => res.render("changePassword", {
//             error: e.message,
//             selectedNavbarItem: 'changePassword'
//         }))
// }