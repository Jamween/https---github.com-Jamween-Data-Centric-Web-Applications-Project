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

// Display grades
router.get('/grades', (req, res) => {
  const query = `
    SELECT 
      student.name AS student_name, 
      module.name AS module_name, 
      grade.grade 
    FROM grade
    LEFT JOIN student ON grade.sid = student.sid
    LEFT JOIN module ON grade.mid = module.mid
    ORDER BY student.name ASC, grade.grade ASC;
  `;
  pool.query(query, (err, results) => {
    if (err) return res.status(500).send('Failed to retrieve grades');
    res.render('grades', { grades: results });
  });
});

module.exports = router;