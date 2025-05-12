const fetch = require('node-fetch');

setInterval(() => {
  fetch('https://online-store-backend-cenl.onrender.com/categories')
    .then(() => console.log('Keep-alive sorğu uğurlu'))
    .catch((err) => console.error('Keep-alive xəta:', err));
}, 300000); // 5 dəqiqədə bir sorğu
