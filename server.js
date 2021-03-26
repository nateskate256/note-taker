const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const {v4: uuidv4} = require("uuid")

let notes = fs.readFileSync("db/db.json", "utf8")
let parsedNotes = JSON.parse(notes)

const PORT = process.env.PORT || 8080;

//Middlware Functions
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// Static file hosting for public directory
app.use(express.static("public"));


//HTML Routes
app.get("/", function (req, res){
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
})

//API Routes
app.get("/api/notes", function (req, res) {
    //Retrieve all notes and res.json them back to front end
    res.json(parsedNotes)
})
app.post("/api/notes", function (req, res) {
    // creates a note from req.body
    parsedNotes.push(req.body)
    console.log(parsedNotes)
    // res.json(parsedNotes)
    // const newData = parsedNotes
    // fs.writeFile(__dirname + "/./db/db.json", newData, function (err){
    //     if (err) throw err
    // })
})
app.delete("/api/notes/:id", function (req, res) {
    // Delete a note based off id
    const { id } = req.params

})

app.listen(PORT, () => console.log("App listening on port " + PORT));