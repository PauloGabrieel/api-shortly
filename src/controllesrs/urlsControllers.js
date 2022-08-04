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