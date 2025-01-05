# Data-Centric-Web-Applications-Project
Data-Centric Web Application

This is a simple web app for managing students, grades, and lecturers. It uses MySQL for student and grade data and MongoDB for lecturer data.

Features

View, add, edit, and delete students.

View grades by students and modules.

View and delete lecturers (only if they don’t teach any modules).

Setup

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:

npm install

Set up the databases:

MySQL: Import proj2024Mysql.sql.

MongoDB: Import proj2024MongoDB.json:

mongoimport --db proj2024MongoDB --collection lecturers --file proj2024MongoDB.json --jsonArray

Run the app:

node app.js

Open your browser and go to:

http://localhost:3004

Files

app.js: Main app file.

routes/: Handles app logic.

views/: Contains page templates.

proj2024Mysql.sql: MySQL database.

proj2024MongoDB.json: MongoDB database.

Notes

Data must be sorted (Students by ID, Grades by name/grade, Lecturers by ID).

Basic validation for forms (e.g., Student ID must be 4 characters, Age 18+).
