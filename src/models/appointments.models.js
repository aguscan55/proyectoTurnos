export const createAppointment = async (client, client_name, date) => {
    const result = await client.query(
      "INSERT INTO appointments (client_name, date) VALUES ($1, $2) RETURNING *",
      [client_name, date]
    );

    res.json(result.rows[0]);
};

export const deleteAppointment = async (client, id) => {
    const result = await client.query(
      "DELETE FROM appointments WHERE id = $1 RETURNING *",
      [id]
    );
    
    return result.rows[0];
};