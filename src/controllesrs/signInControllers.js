import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import connection from "../database/postgres.js";

dotenv.config();

export default async function loginUser(req, res){
    try {
        const {email,password} = req.body;

        const existingUser = await connection.query("SELECT * FROM users WHERE email=$1",[email]);
        if(existingUser.rowCount === 0){
            return res.status(401).send("usuário ou senha não existe");
        };
        
        const correctPassword = bcrypt.compareSync(password, existingUser.rows[0].password);
        if(!correctPassword){
            return res.status(401).send("usuário ou senha não existe");
        };
        const  userData = {
            userId: existingUser.rows[0].id,
            email: existingUser.rows[0].email
        };
        const secretKey = process.env.JWT_SECRET;
        const TIME_30S  = {expiresIn: 60 * 30};
        
        const token = jwt.sign(userData, secretKey, TIME_30S);
        connection.query('INSERT INTO sessions ("userId", token) VALUES ($1,$2)',
        [existingUser.rows[0].id,token]);
        res.status(200).send(token);
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve um erro na hora de logar");
    }
}