export async function createAppointment(form) {
  await fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_name: form.name,
      date: form.date
    })
  });
  if (!res.ok) {
    throw new Error("Error creating appointment");
  }
  return res.json();
}

export async function editAppointment(id, form) {
  const res = await fetch(`http://localhost:3000/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_name: form.name,
      date: form.date
    })
  });

  if (!res.ok) {
    throw new Error("Error editing appointment");
  }
  return res.json();
}
    
export async function deleteAppointment(id) {
  const res = await fetch(`http://localhost:3000/appointments/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Error deleting appointment");
  }
  return res.json(); //Esto devuelve { message, appointment }
}