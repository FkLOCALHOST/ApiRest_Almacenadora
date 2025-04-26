import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
<<<<<<< HEAD
    windowMs: 15*60*1000,
=======
    windowMs: 15 * 60 * 1000,
>>>>>>> 5aec4749495490ef8731d3c1aa5e77ad59f9ca64
    max: 50
})

export default apiLimiter