import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

export default function authentication(req, res, next){
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer', '').trim();
        
        if (!token) return res.status(401).send('Token não existe.');
        
        
        const secretKey = process.env.JWT_SECRET;
        const data = jwt.verify(token,secretKey);
        
        res.locals.userId = data.userId;
    } catch (error) {
        console.log(error);
        
        if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
            return res.sendStatus(401);
        };
        return res.status(500).send("Houve um erro na autenticação do token");
    }
    
    
    next();
};