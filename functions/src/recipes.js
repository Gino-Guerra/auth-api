import { db } from "./dbConnect.js";

const coll = db.collection('recipes')

export async function createRecipe(req,res){
    let newRecipe = req.body 
    newRecipe.userID = rew.local.id
    await coll.add(newRecipe)


    getAllRecipes(req,res)
}

export async function getAllRecipes(req,res){
    const recipeColl = await coll.get()
    const recipes = recipeColl.docs.map(doc => ({id: doc.id, ...doc.data()}))
    res.send(recipes)
}