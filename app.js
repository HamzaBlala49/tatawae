import express from "express";
import env from "dotenv";
import mongoose, { set } from "mongoose"
import {logger,session} from "./middlewares/index.js";

//env configuration
env.config();
// app express
const app = express()
// if the port of environment  not unavailable take 3000
const port = process.env.PORT || 3000; 

// database connection with url come form .env file
mongoose.connect(process.env.dbUrl)
.then(()=>{
    // run the server 
    app.listen(port, () => console.log(`app is listening on http://localhost:3000/`))
})
.catch((err)=> console.log(err));

// event error on database
mongoose.connection.on('error',(error)=>{
    console.log("============Error From Database============");
    console.log(error);
});

// middlewares
session(app);
logger(app);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




app.get('/', (req, res) => res.render('volunteer/login'))

// routes

// 404 route