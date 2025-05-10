const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const categoriesFile = path.join(__dirname, '../data/categories.json');

router.get('/', (req, res) => {
  fs.readFile(categoriesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Məlumat oxuna bilmədi' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;