import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({ userId },process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt",token,{
        maxAge : 15 * 24 * 60 * 60 * 1000, //Ms
        httpOnly : true , // prevet XSS attacks cross-site scripting attacks ; to make this cookie not accessible by a js
        sameSite : "strict" , //CSRF attacks cross-site request forgary attacks
        secure : process.env.NODE_ENV !== "development"
    })  
}

export default generateTokenAndSetCookie;