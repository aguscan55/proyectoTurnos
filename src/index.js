import { scheduleAppointment, editAppointment, deleteAppointment } from "./models/appointments.models.js";
import { createAppointmentSlot, createSlotsInBulk } from "./models/slots.models.js";
import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

const { Client } = pkg;

dotenv.config();

//Connect Supabase as our Database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static("public")); //Esto indica que se use como Frontend al contenido en la carpeta 'public'


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});

const res = await client.query("SELECT NOW()");
console.log(res.rows);


////// Hace un GET para ver todos los turnos tomados //////
app.get("/appointments", async (req, res) => {
  const result = await client.query("SELECT * FROM appointments");
  res.json(result.rows);
});
////// Hace un GET para ver todos los slots que existen y sus appointments asociados, si hay //////
app.get("/slots", async (req, res) => {
  const result = await client.query(
    "SELECT slots.*, appointments.id AS appointment_id, appointments.firstname, appointments.lastname, appointments.dni FROM slots LEFT JOIN appointments ON slots.id = appointments.slot_id"
  );
  res.json(result.rows);
});

////// Toma un turno //////
app.post("/appointments", async (req, res) => {
  const { slot_id, firstname, lastname, dni } = req.body;
  try {
    const appointment = await scheduleAppointment(client, slot_id, firstname, lastname, dni);
    res.json({
      message: "Scheduled", 
      appointment
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: Couldn't schedule the appointment.");
  }
});

////// Edita un turno, pudiendo cambiar su fecha y nombre //////
app.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, dni } = req.body;
  try {
    const appointment = await editAppointment(client, id, firstname, lastname, dni);
    res.json({
      message: "Edited", 
      appointment
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: Couldn't edit the appointment.");
  }
});

////// Cancela un appointment //////
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

////// Crea el slot para un appointment //////
app.post("/slots", async (req, res) => {
  const { doctor, specialty, date } = req.body;
  try {
    const appointment = await createAppointmentSlot(client, doctor, specialty, date);
    res.json({
      message: "Created", 
      appointment
    });
  } catch (err) {
      console.error(err);
      res.status(500).send("Error creating the appointment slot");
  }
});

////// Agrega slots de turnos en bulk //////
app.post("/slots/bulk", async (req, res) => {
  const { doctor, specialty, days, start_time, end_time } = req.body;
  try {
    const appointment = await createSlotsInBulk(
      client, doctor, specialty, days, start_time, end_time
    );
    res.json({
      message: "Created", 
      appointment
    });
  } catch (err) {
      console.error(err);
      if (err.message.includes("exists")) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).send("Error bulk-creating the appointment slots");
  }
});

////// Elimina un slot //////
app.post("/slots/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const slot = await deleteSlot(client, id);
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    res.json({
      message: "Deleted", 
      slot
    });
  } catch (err) {
      console.error(err);
      res.status(500).send("Error: Couldn't delete the appointment slot");
  }
});