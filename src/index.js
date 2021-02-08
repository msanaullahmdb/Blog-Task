const express = require('express')
const cors = require('cors')
const Users = require('./models/users')
const Blog = require('./models/blog')
const userRouter = require('./routers/userRouter')
const blodRouter = require('./routers/blogRouter')

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(blodRouter)

app.listen(port, () => {
    console.log('Server up on port ' + port) 
})