const express=require('express')
const request = require('request')
const bodyParser=require('body-parser')
const db=require('./config/mongoose')
const Abc=require('./models/abc')
const app=express()
app.set("view engine","ejs")
app.get('/',(req,res)=>{
res.render("home")
})
app.get('/about',(req,res)=>{
res.send("this is my about page")
})

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
extended: true
}));

 app.get('/result',(req,res)=>{
console.log(req.query)

Abc.create({
  name : req.query.movie,
  },function(err,newABC){
  if(err)
  {
  return;
  }
  console.log("*********",newABC);
  })

 const url = `http://www.omdbapi.com/?i=tt3896198&apikey=cc35f789&s=${req.query.movie}`
  request(url,function(error,response,body){
if(error===null && response.statusCode===200 )
{
const data=JSON.parse(body)
res.render("result",{x:data})
}
else{
res.send("result not found")
}
}
)
}
)
app.listen(4444,()=>{
console.log(`server started at port `)
})