export async function scheduleAppointment(form) {
  const res = await fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slot_id: form.slot_id,
      firstname: form.firstname,
      lastname: form.lastname,
      dni: form.dni
    })
  });

  if (!res.ok) {
    throw new Error("Error scheduling the appointment");
  }
  return res.json();
}

export async function editAppointment(id, form) {
  const res = await fetch(`http://localhost:3000/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname: form.firstname,
      lastname: form.lastname,
      dni: form.dni
    })
  });

  if (!res.ok) {
    throw new Error("Error editing the appointment");
  }
  return res.json();
}
    
export async function deleteAppointment(id) {
  const res = await fetch(`http://localhost:3000/appointments/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Error cancelling the appointment");
  }
  return res.json(); //Esto devuelve { message, appointment }
}