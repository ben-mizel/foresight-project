# Foresight Project

## Notes
Download the zip file I've been sent
Open the zip file to download its contents in a new folder
Open the new folder in VS Code
In the terminal, initialize the folder/directory as a git repository with `git init`
Create a new repository on GitHub with the same name as the folder (don't create a README, LICENSE, or .gitignore)
In the terminal, set up the remote repository and push the local repository to GitHub

Create a package.json with `npm init`
Create a React frontend in a client directory with the command `npx create-react-app client`
Create a server directory
Create a database directory

project
-client
-server
-database

Create an Express server in server/server.js running on port 5000
Within client/package.json, proxy requests sent to the React server's localhost:3000 over to the Express server's localhost:5000
Update project/package.json with the following scripts:
  "client": "cd client && npm start",
  "server": "nodemon server/server.js",
  "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""

Create a SQLite3 database in database/database.js and export it as a module

Create and populate the database tables
-patients
-appointments

Add server routes for required CRUD functionality and test with Postman
-GET patients: When the app loads, get all the patients alphabetically by last name, store in state, and display them
-POST patients: When I create a patient, add it to the database, and respond with the added row to put at the top of the list in state
-GET appointments/:name: When I click a patient, get all of their appointments ordered by start date/time descending, store in state, and display them
-POST appointments/:name When I create an appointment, add it to the database, and respond with the added appointment to put at the proper index in the patient component's state

Create stateful and presentational React components to store and display user and application data

Add tests and documentation

Create production build

Add search feature