const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});


const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
});

// agrega un appointment
app.post("/appointments", async (req, res) => {
  const { client_name, date } = req.body;

  try {
    const result = await client.query(
      "INSERT INTO appointments (client_name, date) VALUES ($1, $2) RETURNING *",
      [client_name, date]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// lo fetchea

fetch("http://localhost:3000/appointments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    client_name: "Agus",
    date: "2026-04-16 15:00",
  }),
});

// trae todos los appointments (se deberia ver en la pagina), en http://localhost:3000/appointments
app.get("/appointments", async (req, res) => {
  const result = await client.query("SELECT * FROM appointments");
  res.json(result.rows);
});