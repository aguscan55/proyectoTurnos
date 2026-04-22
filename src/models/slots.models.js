export const createAppointmentSlot = async (client, doctor, specialty, date) => {
  //Chequeo no estar creando un turno que sobreescriba otro
  const existing = await client.query("SELECT * FROM slots WHERE doctor = $1 AND date = $2",
    [doctor, date]
  );
  if (existing.rows.length > 0) {
    throw new Error("Slot already exists at that time");
  }

  const result = await client.query(
      "INSERT INTO slots (doctor, date, specialty, is_booked) VALUES ($1, $2, $3, false) RETURNING *",
      [doctor, date, specialty]
    );
    
    return result.rows[0];
};

export const createSlotsInBulk = async (client, doctor, specialty, days, start_time, end_time) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const slots = [];
  //Recorro todos los dias desde hoy hasta los proximos 3 meses
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const daysNum = days.map(Number);
    if (!daysNum.includes(d.getDay())) continue; //Reminder: Dom=0, Lun=1...

    const baseDate = d.toLocaleDateString('en-CA');
    const startDateTime = new Date(`${baseDate}T${start_time}:00`);
    const endDateTime = new Date(`${baseDate}T${end_time}:00`);
    //Creo los turnos cada 4 horas
    for (
      let current = new Date(startDateTime);
      current < endDateTime;
      current.setHours(current.getHours() + 4 * 60 * 60 * 1000)
    ) {
      slots.push(new Date(current));
    }
  }
  //Agrego cada turno a la DB
  for (const slotDate of slots) {
    await client.query(
      "INSERT INTO slots (doctor, date, specialty, is_booked) VALUES ($1, $2, $3, false) RETURNING *",
      [doctor, slotDate, specialty]
    );
  }
  console.log("slots generados:", slots.length);
  return { created: slots.length };
};
