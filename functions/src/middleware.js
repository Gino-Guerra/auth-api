import { jwt } from "jsonwebtoken"
import { secretkey } from "./creds.js"


export async function isAuthenticated(req,res,next){
    //first check if they have a token
    const { authoriztion } = req.headers
    //then check if the token is Valid
    if(!authoriztion){
        res.status(401).send({message: 'No authroization token found'})
        return
    }
    //if so, go on:
    jwt.verify(authoriztion, secretkey)
    .then(decoded => {
        req.local = decoded
        next()
    })
.catch(err => {
    res.status(401).send(err)
})

  
}