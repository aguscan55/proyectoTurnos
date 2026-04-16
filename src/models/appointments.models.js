export const deleteAppointment = async (client, id) => {
    const result = await client.query(
      "DELETE FROM appointments WHERE id = $1 RETURNING *",
      [id]
    );
    
    return result.rows[0];
};