import connection from "../database/postgres.js";

export async function createUser(req,res){
    try {
        const {name,email, password} = req.body;
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email,password]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send("houve um erro em cadastrar um novo usuário");
    };
};