const express = require('express');
const bodyParser = require('body-parser');

// Initialise the app
const app = express();
const port = 3004;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Import routes
const studentsRoutes = require('./routes/students');
const gradesRoutes = require('./routes/grades');
const lecturersRoutes = require('./routes/lecturers');

// Use routes
app.use('/', studentsRoutes);
app.use('/', gradesRoutes);
app.use('/', lecturersRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});