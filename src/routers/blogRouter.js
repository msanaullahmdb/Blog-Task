const express = require('express')
const Blog = require('../models/blog')
require('../db/mongoose')
const auth = require('../middleware/auth')
const routers = new express.Router()

routers.post('/create/Blog',auth,async(req,res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    })
    try{
        console.log(blog)
        await blog.save()
        console.log("here")
        res.status(200).send({blog})
    } catch(e) {
        res.status(400).send(e)
    }
})

routers.get('/fetch/Blog',async(req,res) => {
    try{
        const blog = await Blog.find()
        res.status(200).send(blog)
    } catch(e){
        res.status(400).send(e)
    }
})

routers.patch('/edit/Blog/:id',async(req,res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators:true})
        res.status(200).send(blog)
     } catch(e){
         res.status(500).send(e)
     }  
})

routers.delete('/delete/Blog/:id',async(req,res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).send({message: 'Blog has been deleted successfully'})
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = routers