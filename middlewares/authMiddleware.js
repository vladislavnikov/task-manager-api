const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 const token = req.header("Authorization")?.split(" ")[1];
 if(!token) 
 {
    return res.status(401).json({message: "Unauthorized"});
 }

 try{
    const decode = jwt.verify(token, token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
 } catch {
    res.status(401).json({message: "Invalid token"});
 }
};

module.export = authMiddleware;