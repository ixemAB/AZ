// products.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(productsFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Məlumat oxuna bilmədi: ' + err.message });
  }
});

module.exports = router;
