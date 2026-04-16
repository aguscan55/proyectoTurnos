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