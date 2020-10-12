const { response } = require("express");
const { relativeTimeRounding } = require("moment");
const {admin} = require("../database")

exports.redirectIfLoggedIn = (route) => (req, res, next) => {
    if (res.locals.signedIn)
        return res.redirect(route)
    next();
}


exports.redirectIfLoggedOut = (route) => (req, res, next) => {
    if (!res.locals.signedIn)
        return res.redirect(route)
    next();
}

exports.loadUserData =async (req, res,next) => {

    try{
        const {session} = req.cookies;
        await admin.auth().verifySessionCookie( session, true)
        res.locals.signedIn = true;
    }   
    catch(e){
        res.locals.signedIn = false; 
        res.clearCookie("session")
    }

    next()
}



