const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const uuid = require("uuid");

let notes = fs.readFileSync("db/db.json", "utf8");
let parsedNotes = JSON.parse(notes);
console.log(typeof parsedNotes)
const PORT = process.env.PORT || 8080;

//Middlware Functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file hosting for public directory
app.use(express.static("public"));

//HTML Routes

//Routes HTTP to specified request
app.get("/", function (req, res) {
  //transfers files at given path
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//API Routes
app.get("/api/notes", function (req, res) {
  //Retrieve all notes and res.json them back to front end
  //sends a json response
  res.json(parsedNotes);
});

app.post("/api/notes", function (req, res) {
  // creates a note from req.body
  //adding more elements to end of array and returns new length
  const newNote = req.body
  newNote.id = uuid.v4()
  parsedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNotes))
  res.json(parsedNotes);
});

app.delete("/api/notes/:id", function (req, res) {
  // Delete a note based off id
  // const { id } = req.params
  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNotes.filter((note) => note.id !== req.params.id)))
  res.send("Success")
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
