const express = require('express')
const mongoose = require('mongoose')
const bodyparser=require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()
app.use(bodyparser.json())
app.use(cors())

mongoose.connect("mongodb+srv://peddirajubale:raju7338@cluster0.xpe23es.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log("MongoDB Server Is Running")})
.catch((error)=>{console.log(error)})

const SignInShcema = {
    newUser:String,
    newPassword:String
}

const User = mongoose.model('user', SignInShcema)

app.get('/',(req,res)=>{
    res.send("Peddiraju")
})

app.post('/signup', async (req, res)=>{
    const {newUser,newPassword}=req.body

    try{
        const hashedPassword = await bcrypt.hash(newPassword,10)
        const user = new User({newUser,newPassword:hashedPassword})
        console.log(user)
        await user.save()
        res.json({_message:'Succuss'})
    }catch(error){
        console.log(error)
        
    }
})

app.post('/signin', async (req, res)=>{
    const {newUser,newPassword}=req.body

    try{
        const user = new User.findOne({newUser})
        
        if(!user){
            return res.status(404).send('User not found')
        }
        const passwordMatch = await bcrypt.compare(newPassword,user.newPassword)

        if(!passwordMatch){
            return res.status(401).send('Invalid Password')
        }
        console.log('passwordmatch',passwordMatch)
        return res.status(200).send('signin succussful')
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal Server is Not found'})
    }
})

app.listen(7000,()=>{
    console.log('Server is Running On 7000 Port')
})