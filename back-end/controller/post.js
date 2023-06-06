const db = require('../config');

exports.post = (req,res) =>{
db.query('INSERT INTO post SET ?', req.body, (error, result) =>{
    if(error){
        console.log(error);
        res.status(400).json({
        error: "Ceci est une erreur lol"        
    }) 
    }
    else{
        res.status(200).json({
            message: 'Hourra ça à marché !!'
        })
    }
})
}