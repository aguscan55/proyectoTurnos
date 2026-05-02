# Medical Appointment Scheduling System
Appointment scheduling system for medical clinics, where doctors, secretaries and patients of the clinic can log in with their data, assign available appointments for certain days and times.
The Notion log file for documenting the process and decisions taken can be found on: [here](https://www.notion.so/341f91b18420809eb5e8e6152763360a?v=343f91b1842080768eb6000c1b461565&source=copy_link)


Users can:
* Upload working hours for each clinic employee
* Access the staff data and patients medical records
* Schedule appointments for patients

Clinic's patients can:
* Schedule appointments for themselves and family members whose insurance ID they know
* (Later in development) Receive e-mail confirmation about the date and time of the appointment

## Requirements
* Node.js >=22
* npm >= 10	
* PostgreSQL (Supabase)
* Tailwind CSS IntelliSense extension (if you're using VS Code)
* Git Bash

## Tech Stack
### Backend
- Node.js
- Express

### Frontend
- Alpine.js 
- HTML
- Tailwind CSS


## Setup and Execution

1. Setup your database: Create an .env file following the .env_example. You'll need to create a new Supabase project to get a new database, at https://supabase.com/dashboard/org; click Copy → Direct connection string to add the link needed for the .env.

2. Run the application
```
chmod -x run.sh
./run.sh
```

3. Aca deberiamos agregar para correr algun archivo de fetch a la DB con datos de medicos y pacientes preexistentes para que sea mas creible la vista de los datos (ficha medica y ficha laboral).