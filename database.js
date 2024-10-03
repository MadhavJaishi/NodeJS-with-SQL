import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
}
// const notes = await getNotes();
// console.log(notes);

// Prepared Statement as we are sending query and data seperately to the db
export async function getNote() {
    const [row] = await pool.query(`
        SELECT * FROM notes where id = ?
    `, [id]);
    return row[0]; // even though row has 1 object, it comes in an array
}
// const note = await getNote(1);
// console.log(note);

export async function createNote(title, content) {
    const result = await pool.query(`
        INSERT INTO notes(title, contents) VALUES(?, ?)    
    `, [title, content])
    const id = result.insertId;
    return getNote(id);
}
// const insertedNote = await createNote("SQL", "Structured Database");
// console.log(insertedNote);