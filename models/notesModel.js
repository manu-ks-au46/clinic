const {Schema} = require("mongoose")

const notesSchema = new Schema
({

},{timestamps:true});

const NotesModel = mongoose.model("notes",notesSchema)
module.exports = NotesModel