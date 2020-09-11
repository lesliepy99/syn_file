var express = require(express)
var app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

var result_string = "nothing yet"
app.post('/receive_text',(req,res)=>{
    result_string = req.body['content']
    res.send('received')
})
