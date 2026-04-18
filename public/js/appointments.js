//Si pudieramos poner type="module" en index.html <script> para hacer import, importaríamos estas funciones y quedaria mas ordenado

export async function createAppointment(form) {
      await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_name: this.form.name,
          date: this.form.date
        })
      });
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