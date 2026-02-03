import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-limit-key") // my-limit-key can be anything unique for each user like user id or ip address // normally we use user id when we have authentication implemented

        if (!success) return res.status(429).json({ message: "Too many requests, please try again later" })

        next();
    } catch (error) {
        console.log("Rate limit error", error)
        next(error);
    }
}

export default rateLimiter;