const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Məlumat oxuna bilmədi' });
    res.json(JSON.parse(data));
  });
});

module.exports = router;