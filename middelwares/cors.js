import cors from "cors";

export const corsMiddleware = () => cors((origin, callback) => {
    const ACCEPTED = ['http://localchost:3000']

    if (ACCEPTED.includes(origin) || origin) {
        return callback(null, true)
    } 

    return callback(new Error("Allow CORS"))
})