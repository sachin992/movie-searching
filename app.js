// const express=require('express')
// const request = require('request')
// const bodyParser=require('body-parser')
// const db=require('./config/mongoose')
// const Abc=require('./models/abc')
// const app=express()
// app.set("view engine","ejs")
// app.get('/',(req,res)=>{
// res.render("home")
// })
// app.get('/about',(req,res)=>{
// res.send("this is my about page")
// })

// app.use(bodyParser.json());
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
// extended: true
// }));

//  app.get('/result',(req,res)=>{
// console.log(req.query)

// Abc.create({
//   name : req.query.movie,
//   },function(err,newABC){
//   if(err)
//   {
//   return;
//   }
//   console.log("*********",newABC);
//   })

//  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=cc35f789&s=${req.query.movie}`
//   request(url,function(error,response,body){
// if(error===null && response.statusCode===200 )
// {
// const data=JSON.parse(body)
// res.render("result",{x:data})
// }
// else{
// res.send("result not found")
// }
// }
// )
// }
// )
// app.listen(4444,()=>{
// console.log(`server started at port `)
// })


const express = require('express');
const axios = require('axios');
const db = require('./config/mongoose');
const Abc = require('./models/abc');

const app = express();

// View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render("home");
});

app.get('/about', (req, res) => {
  res.send("This is my about page");
});

app.get('/result', async (req, res) => {
  console.log(req.query);

  // Save to DB
  try {
    const newABC = await Abc.create({ name: req.query.movie });
    console.log("*********", newABC);
  } catch (err) {
    console.log("Database Error:", err);
  }

  // API call using axios
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=api_key&s=${req.query.movie}`;

  try {
    const response = await axios.get(url);

    if (response.data && response.data.Search) {
      res.render("result", { x: response.data });
    } else {
      res.send("No results found");
    }

  } catch (error) {
    console.log("API Error:", error.message);
    res.send("Something went wrong while fetching movie details");
  }
});


// Start Server
app.listen(4444, () => {
  console.log(`Server started on port 4444`);
});
