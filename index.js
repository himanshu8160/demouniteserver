var express= require("express")
var mainRouter =require("./routes/index")
var Conn=require('./Conn')
const cors = require('cors');
var app=express()
var port=5000
app.use(express.json())
app.use('/contents', express.static(process.cwd() + '/contents'))
app.use('/ProfileImages', express.static(process.cwd() + '/ProfileImages'))
app.use('/Uploaded_Files', express.static(process.cwd() + '/Uploaded_Files'))
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: '*'
}));
app.use('/api',mainRouter)

app.listen(port,function(){
    console.log(`Server started on port ${port}`)
})