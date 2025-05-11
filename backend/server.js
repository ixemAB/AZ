const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'https://online-store-frontend-skr8.onrender.com',
  credentials: true,
}));
app.use(express.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} ünvanında işləyir`);
});
