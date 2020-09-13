var express = require('express')
var app = express()
upload = require("express-fileupload")
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload())



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
})

app.post('/upload_file',function (req, res){
    console.log(req.files)
    if(req.files){
        var file = req.files.myfile
        filename = file.name
        file.mv("files/"+filename,function(err){
            console.log(err)
        }
        
        )
    }
    else{
        console.log('error for files')
    }

    res.redirect('/')
    
})

const server = app.listen(3000)