// module.exports = (req,res,next)=>{
// }


module.exports = (req, res, next) => {
    if (req.user !== null) {
        next();
    }
    else return res.status(401).json({
        success: false,
        message: "Unauthrorized",
    });
}