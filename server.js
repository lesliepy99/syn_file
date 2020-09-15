var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
upload = require("express-fileupload")
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload())



var result_string = "nothing yet"
var the_path = path.join(__dirname,"files")

//Send the file requested by the client

app.get('/download_file/:name',function (req, res){

console.log("received")

console.log(req.params)

res.sendFile(__dirname+'/files/'+req.params['name'])

})
//Approach the text
app.get('/approach',(req,res)=>{
    console.log('send')
    res.send(result_string)
})

//Show the list of files
app.get('/fresh_list',function (req, res){
    
    fs.readdir(the_path,function(err,files){
        if(err){
            res.send('Error of getting the directory list')
        }
        
        
        else{
            file_container = []
            files.forEach(function(file){
                file_container.push(file)
            })
            console.log(file_container)
            res.send(file_container)
        }
    })
})

//Get the HTML file
app.get('/*',function (req, res){
    res.sendFile(__dirname+'/public/index.html')
})

//Upload text
app.post('/receive_text',(req,res)=>{
    result_string = req.body['content']
    res.redirect('/')
})

//Upload files
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
