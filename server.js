var express = require('express')
var app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

var result_string = "nothing yet"
app.get('/approach',(req,res)=>{
    console.log('send')
    res.send(result_string)
})
app.get('/*',function (req, res){
    res.sendFile(__dirname+'/public/index.html')
})
app.post('/receive_text',(req,res)=>{
    result_string = req.body['content']
    res.redirect('/')
})


const server = app.listen(3000)
