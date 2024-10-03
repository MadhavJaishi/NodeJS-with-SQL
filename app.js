// npm run dev to run nodemon, for normal just node app.js
const express = require("express")
const app = express();
import dotenv from "dotenv"
import { getNotes, getNote, createNote } from "./database"

app.use(express.json())
dotenv.config()
app.get("/get-notes", async (req, res) => {
    const [rows] = await getNotes();
    res.status(200).json({
        msg: "Success",
        data: rows,
    })
})

app.get("/get-note/:id", async (req, res) => {
    const id = req.params.id;
    const [row] = await getNote(id);
    res.status(200).json({
        msg: "Success",
        data: row[0],
    })
})

app.post("/create-note", async (req, res) => {
    const [title, content] = req.body;
    const note = await createNote(title, content);
    res.status(200).json({
        msg: "Success",
        data: note,
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({msg: "Something broke"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})