const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },

    publishedYear:Number,
    genre:[{
        type:String,
        enum:['Fiction','Business','Non-Fiction','Mystery','Thriller','Science Fiction','Fantasy','Romance','Historical','Biography','Self-help','Other','Autobiography']
    }],
    language:String,
    country:String,
    rating:Number,
    summary:String,
    coverImageUrl:String,
},{
    timestamps:true
})

const Book = mongoose.model("Book",BookSchema);

module.exports = Book;