const express = require('express')
const app = express()
const cors = require('cors')
const port = 8001

const flames = require('./function/function')

app.use(express.json())
app.use(cors())

app.post('/flames',flames.strcture )

app.listen(port,(err)=>{
    if(err){
        console.log("error is : ",err);
    }else{
        console.log(`listern port is localhost:${port}`);
    }
})
