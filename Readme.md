# Medical Appointment Scheduling System
???
The Notion log file for documenting the process and decisions taken can be found on: [here](https://www.notion.so/341f91b18420809eb5e8e6152763360a?v=343f91b1842080768eb6000c1b461565&source=copy_link)


Users can:
* Upload working hours for each doctor employee from the clinic
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
- Express (que hace?)

### Frontend
- Alpine.js 
- HTML
- Tailwind CSS


## Setup and Execution

1. Setup your project:
```
chmod -x setup.sh
./setup.sh
```

2. Run the application
```
chmod -x run.sh
./run.sh
```

Ya a partir de aca es de otro proyecto, queda como plantilla nomas
3. Create an .env file following the .env_example. You'll need to create your own Slack App at https://api.slack.com/apps/; in Features → OAuth & Permissions → Scope, add bot token scopes for your bot to be able to write and read from the channels you add it to. In OAuth Tokens, click Install to <your Slack Project> to get the Authentication and Verification Tokens needed for the .env.

4. Log in to ngrok and create a domain to start a tunnel (you can reuse an existing ngrok domain if you already have one)

5. Use ngrok in a new terminal to expose your local server. From slackbot/ngrok run:
```
./ngrok http 8000 --url=<YOUR_NGROK_URL>
```

6. Copy the generated public URL and configure it in your Slack App:

Slack App → Event Subscriptions → Request URL → <YOUR_NGROK_URL>/events/

Example:
```
https://xxxx.ngrok.io/slack/events/
```

Make sure ngrok is running so Slack can reach your local backend.