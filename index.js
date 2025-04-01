const {initialiseDatabaseConnection} = require("./db/db.connect")
const Book = require("./models/books.model")
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

initialiseDatabaseConnection();

async function createBook(bookData) {

    try{
        const book = new Book(bookData);
        const createdBook = await book.save();
        return createdBook;
    }catch(error){
        console.log("An error occurred while creating book",error)
    }
    
}

async function getAllTheBooks(){
    try{
        const allBook = await Book.find();
        return allBook;
    }catch(error){
        console.log("An error occurred while fetching data.")
    }
}

async function getBookByTitle(bookTitle) {
    try{
        const getBookByTitle = await Book.findOne({title:bookTitle})
        return getBookByTitle;
    }catch(error){
        console.log("An error occurred while fetching books.")
    }
}

async function getBookByAuthor(bookAuthor) {
    try{
        const getBookByAuthor = await Book.findOne({author:bookAuthor})
        return getBookByAuthor;
    }catch(error){
        console.log("An error occurred while fetching books.")
    }
}

async function getBookByGenre(bookGenre) {
    try{
        const bookByGenre = await Book.find({genre:bookGenre})
        return bookByGenre;

    }catch(error){
        console.log("An error occurred while fetching books.")
    }
}

async function getBookByYear(bookYear) {
    try{
        const bookByYear = await Book.find({publishedYear:bookYear})
        return bookByYear;
    }catch(error){
        console.log("An error occurred while fetching books.")
    }
}


async function updateBookById(bookId,dataToUpdate){
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new:true});
        return updatedBook;
    }catch(error){
        console.log("An error occurred",error)
    }
}

async function updateBookByTitle(bookTitle,dataToUpdate){
    try{
        const updatedBook = await Book.findOneAndUpdate({title:bookTitle},dataToUpdate,{new:true});
        return updatedBook;
    }catch(error){
        console.log("An error occurred while updating.")
    }
}

async function deleteBookById(bookId){
    try{
const deletedBook = await Book.findByIdAndDelete(bookId);
    return deletedBook;
    }catch(error){
        console.log("An error occurred while deleting data.")
    }
    
}

app.get("/books",async (req,res)=>{
    try{
        const allBooks = await getAllTheBooks();
        if(allBooks){
            res.status(201).json({message:"Book found successfully,",book:allBooks})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
res.status(500).json({error:"An error occurred while fetching data."})
    }
})

app.get("/books/title/:bookTitle",async (req,res)=>{
    try{
        const allBooks = await getBookByTitle(req.params.bookTitle);
        if(allBooks){
            res.status(201).json({message:"Book found successfully,",book:allBooks})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
res.status(500).json({error:"An error occurred while fetching data."})
    }
})

app.get("/books/author/:bookAuthor",async (req,res)=>{
    try{
        const bookByAuthor = await getBookByAuthor(req.params.bookAuthor);
        if(bookByAuthor){
            res.status(201).json({message:"Book found successfully,",book:bookByAuthor})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
res.status(500).json({error:"An error occurred while fetching data."})
    }
})

app.get("/books/genre/:bookGenre",async (req,res)=>{
    try{
        const bookByGenre = await getBookByGenre(req.params.bookGenre);
        if(bookByGenre.length>0){
            res.status(201).json({message:"Book found successfully,",book:bookByGenre})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
res.status(500).json({error:"An error occurred while fetching data."})
    }
})

app.get("/books/year/:bookYear",async (req,res)=>{
    try{
        const bookByYear = await getBookByYear(req.params.bookYear);
        if(bookByYear.length>0){
            res.status(201).json({message:"Book found successfully,",book:bookByYear})
        }else{
            res.status(404).json({error:"No book found."})
        }
    }catch(error){
res.status(500).json({error:"An error occurred while fetching data."})
    }
})

app.post("/books",async (req,res)=>{
    try{
        const bookData = req.body;
        
        if(bookData.title && bookData.author && bookData.publishedYear && bookData.genre.length>0 && bookData.language && bookData.country && bookData.rating && bookData.summary && bookData.coverImageUrl){
            const createdBook = await createBook(bookData);
            if(createdBook){
             res.status(201).json({message:"Book added succesfully.",book:createdBook})
            } else {
                res.status(400).json({error:"Please check the request data again."})
            }
           
        } else{
            res.status(400).json({error:"Please provide book title ,author && genre."})
        }
    }catch(error){
        res.status(500).json({error:"An error occurred while inserting data."})
    }
})

app.post("/books/:bookId",async (req,res)=>{
try{
    const bookData = req.body;
    const updatedBook = await updateBookById(req.params.bookId,bookData);
    if(updatedBook){
        res.status(201).json({message:"book updated successfully",book:updatedBook})
    }else{
        res.status(404).json({error:"Book not found."})
    }
}catch(error){
    res.status(500).json({error:"An error occur while updating book."})
}
})

app.post("/books/title/:bookTitle",async (req,res)=>{
try{
    const bookData = req.body;
    const updatedBook = await updateBookByTitle(req.params.bookTitle,bookData);
    if(updatedBook){
        res.status(201).json({message:"book updated successfully",book:updatedBook})
    }else{
        res.status(404).json({error:"Book not found."})
    }
}catch(error){
    res.status(500).json({error:"An error occur while updating book."})
}
})

app.delete("/books/:bookId",async (req,res)=>{
    try{
        const deletedBook = await deleteBookById(req.params.bookId);
        if(deletedBook){
            res.status(200).json({message:"book deleted successfullly.",book:deletedBook})
        }else{
res.status(404).json({error:"Movie not found."})
        }
    }catch(error){
        res.status(500).json({error:"An error occurred while deleting movie."})
    }
})


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
console.log(`Server started running on PORT ${PORT}`)
})