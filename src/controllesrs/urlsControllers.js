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
    try {
        const id = parseInt(req.params.id);
    
        const data =  await connection.query('SELECT u.id, u.url, u."shortUrl" FROM urls u WHERE u.id=$1;',[id])
        if(data.rowCount === 0){
            return res.sendStatus(404);
        };
        res.status(200).send(data.rows[0]);    
    } catch (error) {
        console.log(error);
        res.status(500).send("houve um erro na hora de buscar o link pelo id");
    };
    
};

export async function redirectUrl(req, res){
    try {
        const {shortUrl} = req.params;
    
        const data = await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1',[shortUrl]);
        if(data.rowCount === 0){
            return res.sendStatus(404);
        };
        const {id} =data.rows[0]
        const {visitCount} = data.rows[0];
        const {url} =data.rows[0];
        await connection.query('UPDATE urls SET "visitCount" = $1 WHERE id=$2',[(visitCount + 1),id])
        res.redirect(url);    
    } catch (error) {
        console.log(error);
        res.status(500).send("houve um erro na hora de redirecionar para a url");
    };
    
};

export async function deleteUrl(req, res){
    try {
        const urlId = parseInt(req.params.id);
        const {userId} = res.locals;
        
        const existingUrl = await connection.query('SELECT * FROM urls WHERE urls.id = $1',[urlId]);

        if(existingUrl.rowCount === 0){
            return res.sendStatus(404);
        };
        
        if(existingUrl.rows[0].userId != userId){
            return res.sendStatus(401);
        };

        await connection.query('DELETE FROM urls WHERE id=$1',[urlId]);
        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(500).send("houve um erro em deletar a url");
    }
}