import { db } from "./dbConnect.js";
import  jwt  from "jsonwebtoken";
import { secretkey } from "./creds.js";
import bcrypt from "bcrypt"

const coll = db.collection('users');


export async function createUser(req,res){
const { email, password } = req.body;
if(!email || !password || email.length < 6 || password.length < 6 ){
    res.status(400).send({ message: 'Invalid email or password.'})
    return
}
const hashedPw = await bcrypt.hash(password, 10)
await coll.add({email:email.toLowerCase(), password: hashedPw});
login(req, res);

}

export async function login(req, res){
    const { email, password } = req.body;
    const userColl = await coll.where('email','==', email.toLowerCase()).get()
                                                         
    const users = userColl.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const user = users.filter(user => bcrypt.compareSync(password, user.password))[0]
    if(!user) {
        res.status(400).send({ message: 'Not authorized;'})
    }
    delete user.password;
    const token = jwt.sign(user, secretkey);
    res.send({ token });
}