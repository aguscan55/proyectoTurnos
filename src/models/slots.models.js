export const createAppointmentSlot = async (client, doctor, specialty, date) => {
    const result = await client.query(
      "INSERT INTO slots (doctor, date, specialty, is_booked) VALUES ($1, $2, $3, false) RETURNING *",
      [doctor, date, specialty]
    );
    
    return result.rows[0];
};
