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

Add server routes for required CRUD functionality and test with Postman

Create stateful and presentational React components to store and display user and application data