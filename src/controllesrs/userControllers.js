import connection from "../database/postgres.js";

export async function userUrls(req, res){
    try {
        const userId = res.locals.userId;
        const {rows:sumVisitCount} = await connection.query(`
            SELECT SUM(urls."visitCount") 
            FROM urls 
            WHERE urls."userId"=$1
            GROUP BY urls."userId"
            `,[userId]
        );
        const {rows:userUrlList} = await connection.query(`
            SELECT u.id, u."shortUrl", u.url, u."visitCount"
            FROM urls  u
            WHERE u."userId"=$1
        `,[userId]);    
        const {rows:userData} = await connection.query('SELECT u.id, u.name FROM users u WHERE u.id=$1',[userId]);
        const data  = {
            id: userData[0].id,
            name: userData[0].name,
            visitCount: sumVisitCount[0].sum,
            shortenedUrls: userUrlList
        }
        res.status(200).send(data);    
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve um erro na hora de obter a lista de links do usuário");
    }
}

