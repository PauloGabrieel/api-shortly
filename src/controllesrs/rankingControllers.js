import connection from "../database/postgres.js";

export async function getRanking (req, res){
    try {
        const data = await connection.query(`
            SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", COALESCE(SUM(urls."visitCount"),0) AS "visitCount"
            FROM users LEFT JOIN urls 
            ON users.id = urls."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC, "linksCount" DESC
            LIMIT 10
        `);
        res.send(data.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send("hoouve um erro em obter o rank");
    }
};