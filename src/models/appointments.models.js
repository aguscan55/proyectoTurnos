export const scheduleAppointment = async (client, slot_id, firstname, lastname, dni) => {
    const result = await client.query(
      "INSERT INTO appointments (slot_id, firstname, lastname, dni) VALUES ($1, $2, $3, $4) RETURNING *",
      [slot_id, firstname, lastname, dni]
    );
    await client.query(
      "UPDATE slots SET is_booked = true WHERE id = $1",
      [slot_id]
    );

    return result.rows[0];
};

export const editAppointment = async (client, id, firstname, lastname, dni) => {
    const result = await client.query(
      "UPDATE appointments SET firstname = $1, lastname = $2, dni = $3 WHERE id = $4 RETURNING *",
      [firstname, lastname, dni, id]
    );

    return result.rows[0];
};

export const deleteAppointment = async (client, id) => {
    const appt = await client.query(
      "SELECT slot_id FROM appointments WHERE id = $1",
      [id]
    );
    //Borrar el appointment
    await client.query(
      "DELETE FROM appointments WHERE id = $1",
      [id]
    );
    
    if (appt.rows.length === 0) return null; //Nomas por si no existe el appointment
    const slot_id = appt.rows[0].slot_id;

    //Pone el slot en Disponible
    await client.query(
      "UPDATE slots SET is_booked = false, firstname = null, lastname = null, dni = null, appointment_id = null WHERE id = $1",
      [slot_id]
    );
    
    return { id, slot_id }; //En vez de devolver el appointment borrado
};