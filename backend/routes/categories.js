// categories.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const categoriesFile = path.join(__dirname, '../data/categories.json');

router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(categoriesFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Məlumat oxuna bilmədi: ' + err.message });
  }
});

module.exports = router;
