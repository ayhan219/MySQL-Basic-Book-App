const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ayhan551",
    database:"test"
})

app.get("/books",(req,res)=>{
    const q = "Select * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q = "insert into books (`title`,`desc`,`price`,`cover`) values(?)"
    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
            return res.json("books created")
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "delete from books where id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
            return res.json("books deleted")
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "update books set `title`=?,`desc`=?,`price`=?,`cover`=? where id=?";
     
    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err)
            return res.json("books updated")
    })
})

app.listen(5000,()=>{
    console.log("connected to backend");
    
})