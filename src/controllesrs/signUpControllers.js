import connection from "../database/postgres.js";
import bcrypt from "bcrypt";

export async function createUser(req,res){
    try {
        const {name,email, password} = req.body;
        
        const cryptPassword = bcrypt.hashSync(password,10);
        console.log(password);
        console.log(cryptPassword);

        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email,cryptPassword]);
        res.sendStatus(201);
    } catch (error) {
        if(error.constraint){
            return res.sendStatus(409);
        };
        console.log(error);
        res.status(500).send("houve um erro ao cadastrar o usuário");
    };
};