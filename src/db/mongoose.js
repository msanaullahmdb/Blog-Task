const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dcs:sana@1998@cluster0.66nen.mongodb.net/blog-task?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true
})