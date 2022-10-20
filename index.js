const PORT = 5555;
const express = require('express');
var cors = require('cors');
// var product = require("./api/product")
const app = express();
app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
const { v4: uuidv4 } = require('uuid');
const todo = require('./db.json');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const fs = require("fs");
// var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
app.use(express.json());
app.use(express.static('public'))
var options = {
    "origin": "*",
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "preflightContinue": false,
    "optionsSuccessStatus": 200
  }
// app.set('view engine', 'ejs');
app.get('/',cors(),(request,response, next) => {
    fs.readFile(__dirname+"/db.json", function (data) {
        data = todo;
        console.log(data);
        response.json(data)
        // response.end();
     })
})
// app.set('view engine', 'ejs');
// app.get('/:id', (req, res) => {
//     const id = req.params.id;
//     for (let one of todo) {
//         if (one.id === id) {
//             res.json(one);
//             return;
//         }
//     }
//     res.end();
// });
app.post("/",cors(), (req,res,next) => {
    fs.readFile(__dirname+"/db.json", function (data) {
        data = todo
        // const id = uuidv4();
        var obj = {
                id:uuidv4(),
                title:req.body.title,
                description: req.body.description,
                Completed:false
            }
            data.push(obj);
            res.json(data);
            res.end();
     });
//     const id = uuidv4();
//    var obj = {
//         id,
//         ...req.body
//     }
//     todo.push(obj);
//     res.json(todo);
//     res.end();
});

app.options('/:id',cors())

app.get("/:id",cors(options),(req, res,next) => {
    fs.readFile(__dirname+"/db.json", function(data){
        data = todo
        const { id } = req.params;
    for (let one of data) {
        if (one.id === id) {
            res.json(one);
            return;
        }
    }
    res.end();
});
});
app.put("/:id",cors(options),(req,res,next) => {

    fs.readFile(__dirname+"/db.json", 'utf8', function(data){
        data = todo
        const { id } = req.params;
    const index = data.findIndex(task => task.id === id);
    console.log(index);
    if(index > -1){
        data[index] = req.body
        res.json(data[index]);
    } else {
        console.log("Error, Not Found");
        res.end("Error, Not Found");
    };
    });
    // const { id } = req.params;
    // const index = todo.findIndex(task => task.id === id);
    // console.log(index)
    // if(index > -1){
    //     todo[index] = req.body
    //     res.json(todo[index])
    // } else {
    //     console.log("Error, Not Found");
    //     res.end("Error, Not Found");
    // }
    // todo.updateOne({id: req.params.id}, todo) 
    
});
app.delete("/:id",cors(options),(req,res,next) => {
    fs.readFile(__dirname+"/db.json", 'utf8', function(data){
        data = todo
        const { id } = req.params
        const index = data.findIndex(task => task.id === id);
        if(index > -1){
            data.splice(index,1);
            res.json(data);
        } else {
            console.log("Error, Not Found");
            res.end("Error, Not Found");
        }
    });
    // const { id } = req.params;
    // const index = todo.findIndex(task => task.id === id);
    // if(index > -1){
    //     todo.splice(index,1)
    //     res.json(todo)
    // } else {
    //     console.log("Error, Not Found");
    //     res.end("Error, Not Found")
    // }
});
app.listen(process.env.PORT|| 5555, () => {
    console.log(`Listenig on http://localhost:${PORT}`);
});
// module.exports = app;
