import jwt from "jsonwebtoken";
import createError from "./error.js";

const getToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token) return next(createError(401, "Unauthorized"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, "Invalid User"))
        req.user = user
        next()
    })
}

