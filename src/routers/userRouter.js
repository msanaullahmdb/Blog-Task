const express = require('express')
const Users = require('../models/users')
require('../db/mongoose')
const auth = require('../middleware/auth')
const routers = new express.Router()

routers.post('/users/SignUp', async(req,res) => {
    const users = new Users(req.body)
    try {
        await users.save()
        const token = await users.generateToken()
        res.status(201).send({users,token})
    } catch(e) {
        res.status(400).send(e)
    }
})

routers.post('/users/login', async (req, res) => {
    try{
        const users = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await users.generateToken()
        res.status(201).send({ users, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

routers.post('/users/logout', auth, async (req,res) => {
    try{
       req.user.tokens = req.user.tokens.filter((token) => {
           return token.token != req.token
       }) 
       await req.user.save()
       res.status(200).send({message:'You have succesfully logout'})
    } catch(e){
        res.status(500).send()
    }
})

module.exports = routers