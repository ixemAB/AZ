const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// data qovluğunu yoxla
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('data qovluğu yaradıldı.');
}

app.use(express.json());
app.use(cors({
  origin: 'https://online-store-frontend.onrender.com',
  credentials: true,
}));
app.use(helmet());
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server ${PORT}-ci portda işləyir`);
});
