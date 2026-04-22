export async function createAppointmentSlot(form) {
  const res = await fetch("http://localhost:3000/slots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        doctor: form.doctor,
        specialty: form.specialty,
        date: form.date
    })
  });

  if (!res.ok) {
    throw new Error("Error creating the appointment slot");
  }
  return res.json();
}

export async function createSlotsInBulk(form) {
  const res = await fetch("http://localhost:3000/slots/bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        doctor: form.doctor,
        specialty: form.specialty,
        days: form.days,
        start_time: form.start_time,
        end_time: form.end_time
    })
  });

  if (!res.ok) {
    throw new Error("Error bulk-creating the appointment slots");
  }
  return res.json();
}