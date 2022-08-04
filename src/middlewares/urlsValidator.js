import urlSchema from "../schemas/urlsSchema.js";

export function validateUrl (req,res, next){
    try {
        const userId = res.locals.userId;
        console.log(userId);
        const {url} = req.body;

        const validation = urlSchema.validate(url);

        if(validation.error){
            const message = validation.error.details.message;
            return res.status(422).send(message);
        };
        next();    
    } catch (error) {
        console.log(error);
        res.status(500).send("houve um erro ao validar o body da req");
    };
    
};