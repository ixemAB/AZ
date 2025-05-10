const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
require('dotenv').config();

const app = express();

// Təhlükəsizlik üçün middleware-lər
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // Frontend-in ünvanı
  credentials: true,
}));
app.use(express.json());

// Routelar
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Serverin işə salınması
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} ünvanında işləyir`);
});