import { createAppointment, deleteAppointment } from "./models/appointments.models.js";
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

//Connect Supabase as our Database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static("public")); //Esto indica que se use como Frontend al contenido en la carpeta 'public'

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
});

//Add an appointment to the Database
app.post("/appointments", async (req, res) => {
  const { client_name, date } = req.body;

  try {
    const appointment = await createAppointment(client, client_name, date);
    res.json({
      message: "Assigned", 
      appointment
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: Couldn't create the appointment.");
  }
});


//Hace un GET de todos los appointments (se deberia ver en la pagina), en http://localhost:3000/appointments
app.get("/appointments", async (req, res) => {
  const result = await client.query("SELECT * FROM appointments");
  res.json(result.rows);
});


app.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await deleteAppointment(client, id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({
      message: "Deleted", 
      appointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error: Couldn't delete the appointment.");
  }
});