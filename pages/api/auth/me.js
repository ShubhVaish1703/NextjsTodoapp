import { checkAuth } from '@/utils/features';
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET") return errorHandler(res, 400, "Only GET Method is Allowed.")

    const user = await checkAuth(req);
    if (!user) return errorHandler(res, 401, "Login First");

    res.status(200).json({
        success: true,
        user,
    })
})

export default handler;