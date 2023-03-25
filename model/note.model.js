const mongoose = require("mongoose")

//note schema

const noteSchema = mongoose.Schema({
   title : String,
   description : String,
   subject : String,
   userID : String
},{
    versionKey : false
})
const NoteModel = mongoose.model("note",noteSchema)

module.exports = {NoteModel} 