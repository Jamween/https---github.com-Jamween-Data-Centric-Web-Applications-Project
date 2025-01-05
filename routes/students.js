const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proj2024Mysql',
});

// Display all students
router.get('/students', (req, res) => {
  const query = 'SELECT * FROM student ORDER BY sid ASC';
  pool.query(query, (err, results) => {
    if (err) return res.status(500).send('Failed to retrieve students');
    res.render('students', { students: results });
  });
});

// Add a student
router.get('/students/add', (req, res) => {
  res.render('add-student', { error: null });
});

router.post('/students/add', (req, res) => {
  const { sid, name, age } = req.body;
  if (!sid || sid.length !== 4) {
    return res.render('add-student', { error: 'Student ID must be 4 characters.' });
  }
  if (!name || name.length < 2) {
    return res.render('add-student', { error: 'Name must be at least 2 characters.' });
  }
  if (age < 18) {
    return res.render('add-student', { error: 'Age must be 18 or older.' });
  }
  const query = 'INSERT INTO student (sid, name, age) VALUES (?, ?, ?)';
  pool.query(query, [sid, name, age], (err) => {
    if (err) return res.render('add-student', { error: 'Student ID already exists.' });
    res.redirect('/students');
  });
});

// Edit a student
router.get('/students/edit/:sid', (req, res) => {
  const query = 'SELECT * FROM student WHERE sid = ?';
  pool.query(query, [req.params.sid], (err, results) => {
    if (err) return res.status(500).send('Failed to retrieve student');
    res.render('edit-student', { student: results[0], error: null });
  });
});

router.post('/students/edit/:sid', (req, res) => {
  const { name, age } = req.body;
  if (!name || name.length < 2) {
    return res.render('edit-student', { error: 'Name must be at least 2 characters.' });
  }
  if (age < 18) {
    return res.render('edit-student', { error: 'Age must be 18 or older.' });
  }
  const query = 'UPDATE student SET name = ?, age = ? WHERE sid = ?';
  pool.query(query, [name, age, req.params.sid], (err) => {
    if (err) return res.status(500).send('Failed to update student');
    res.redirect('/students');
  });
});

// Delete a student
router.get('/students/delete/:sid', (req, res) => {
  const query = 'DELETE FROM student WHERE sid = ?';
  pool.query(query, [req.params.sid], (err) => {
    if (err) return res.status(500).send('Failed to delete student');
    res.redirect('/students');
  });
});

module.exports = router;