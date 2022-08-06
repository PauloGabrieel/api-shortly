import { nanoid } from "nanoid";
import connection from "../database/postgres.js";

export async function shortenUrl(req,res){
    try {
        const userId = res.locals.userId;
        const url = req.body.url;
        let shortUrl = url;
        shortUrl = nanoid();
        
        await connection.query('INSERT INTO urls ( url, "shortUrl", "userId") VALUES ($1,$2,$3)',
        [url,shortUrl, userId]);
        res.status(201).send(shortUrl);
    } catch (error) {
        console.log(error);
    };
};
export async function getShortUrlById(req, res){
    const id = parseInt(req.params.id);
    
    const data =  await connection.query('SELECT u.id, u.url, u."shortUrl" FROM urls u WHERE u.id=$1;',[id])
    if(data.rowCount === 0){
        return res.sendStatus(404);
    };
    res.status(200).send(data.rows[0]);
};