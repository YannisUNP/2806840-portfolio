const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const books = [];
const book = {
    id: 1,
    title: "To Kill a Mockingbird",
    details: [{id: this.id, author: "Harper Lee", genre: "Fiction", publicationYear: 1960}] 
};
books.push(book);
const studentNumber = {studentNumber: "2806840"};

app.get("/whoami", (req,res) =>{
    res.status(200).send(studentNumber);
})
app.get("/books", (req, res) =>{
    res.status(200).send(books);
})
app.get("/books/:id", (req, res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send({error: "Book not found"});
    res.status(200).send(book);
});
app.post("/books", (req,res) =>{
    if(!req.body.id || !req.body.id){
        const error = {error: "Missing required fields"};
        res.status(400).send(error);
        return;
    }
    const b = {
        id : req.body.id,
        title : req.body.title
    };
    books.push(b);
    res.status(201).send(b);
});
app.put("/books/:id", (req,res) =>{
    if(!books[req.params.id]){
        res.status(404).send({error: "Book not found"});
        return;
    } 
    const b = books[req.params.id];
    books[req.params.id].title = req.body.title;
    res.status(200).send(books[req.params.id]);
});
app.delete("/books/:id", (req, res) =>{
    if(!books[req.params.id]){
        res.status(404).send({error: "Book not found"});
        return;
    }
    books.splice(req.params.id, 1);
    
})



app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})