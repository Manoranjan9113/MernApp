 
 function generateAuthKey(length){
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let authKey = '';

    for(var i=0; i < length; i++){
        const randomeTxt = Math.floor(Math.random() * characters.length);
        authKey += characters.charAt(randomeTxt);
    }

    return authKey;
 }

 const accesToken = generateAuthKey(100);
  
function validateAuthkey(req, res, next, accesToken){
    const authKey = req.body.authKey;
    const accesTokens = accesToken;
    console.log(accesTokens);
    if(authKey !== accesTokens){
        res.status(401).json({ Message: "Invalid Authentication Key"});
    }else{
        res.json({message: "Authentication is Correct"})
    }

    next();
}

module.exports = {generateAuthKey, validateAuthkey,};
