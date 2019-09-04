const express = require('express');
const bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.json());

var url = 'mongodb://127.0.0.1:27017/test';

app.get('/students',async (req,res)=>{
    var arr = [];
      mongo.connect(url,(err,client) =>{
        if(!err){
            var db = client.db('test');
            var col = db.collection('student').find();
            //var col= db.collection('student').find({"roll":parseInt(req.params.id)});
    
            // col.forEach(element => {
            //     arr.push(element)
            //     console.log(element);
            // }).then(()=>{
            //     console.log('abcd');
            //     res.send(arr);
            // });

            col.forEach(element => {
                arr.push(element)
                console.log(element);
            },()=>{
                console.log('abcd');
                res.send(arr);
            });
        }
    });
});

app.post('/students',(req,res)=>{
    mongo.connect(url,(err,client)=>{
        if(!err){
            var db=client.db('test');
            var student = 
            {"roll": parseInt(req.body.roll),"name": req.body.name,"subject": req.body.subject};
            db.collection('student').
            insertOne(student).
            then(()=>{
                res.status(201);
                res.send(student);
            });
        }
    });
});
app.get('/students/:id', (req,res)=>{
    var arr = [];
      mongo.connect(url,(err,client) =>{
        if(!err){
            var db = client.db('test');
            //var col = db.collection('student').find();
            //var col= db.collection('student').find({"roll":parseInt(req.params.id)});
            var col= db.collection('student').find({"roll":parseInt(req.params.id)});
         
            // col.forEach(element => {
            //     arr.push(element)
            //     console.log(element);
            // }).then(()=>{
            //     console.log('abcd');
            //     if(arr.length!=0){
            //         res.send(arr);
            //     }
            //     res.send(`record not found with id ${req.params.id}`);
            // });

            if(col)col.forEach(element => {
                arr.push(element)
                console.log(element);
            },()=>{
                console.log('abcd');
                if(arr.length!=0){
                    res.send(arr);
                }
                res.send(`record not found with id ${req.params.id}`);
            });
        }
    });
});


app.listen(5001,()=>{
    console.log('listening on 5001');
    
});