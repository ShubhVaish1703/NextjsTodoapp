// for sending error message
export const errorHandler = (res,statusCode=500,message="Internal Server Error") => {
    return res.status(statusCode).json({
        success: false,
        message
    })
}
// to catch the async errors in route handlers.. this is used as same as try catch block.
export const asyncError =(passedFunc) => (req,res)=>{
    return Promise.resolve(passedFunc(req,res)).catch((error)=>{
        return errorHandler(res,500,error.message);
    })
}