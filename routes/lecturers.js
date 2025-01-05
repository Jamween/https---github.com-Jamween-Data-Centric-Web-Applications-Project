const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/proj2024MongoDB');

// MongoDB schema for lecturers
const lecturerSchema = new mongoose.Schema({
  _id: String,
  name: String,
  did: String,
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

// Display all lecturers
router.get('/lecturers', async (req, res) => {
  try {
    const lecturers = await Lecturer.find().sort('_id');
    res.render('lecturers', { lecturers });
  } catch {
    res.status(500).send('Failed to retrieve lecturers');
  }
});

// Delete a lecturer
router.get('/lecturers/delete/:lid', async (req, res) => {
  try {
    const { lid } = req.params;

    // Check if lecturer teaches any modules
    const query = 'SELECT COUNT(*) AS moduleCount FROM module WHERE lecturer = ?';
    pool.query(query, [lid], async (err, results) => {
      if (err || results[0].moduleCount > 0) {
        return res.status(400).send('Cannot delete lecturer: associated modules exist.');
      }

      // Delete lecturer
      await Lecturer.findByIdAndDelete(lid);
      res.redirect('/lecturers');
    });
  } catch {
    res.status(500).send('Failed to delete lecturer');
  }
});

module.exports = router;