const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51RIBjVPwH4rWjRjgWaBV1Jl9xyYdOB3bQljw2gT0d900N6I8fwoLxDknTiJX1ysgUSXyedUtWLHlNapxZJ7n1ZET00jxwKdRPr');
const PRODUCTS_FILE = './products.json';

app.use(cors({ origin: '*' }));
app.use(express.json());

// Məhsulları oxu
async function readProducts() {
    try {
        const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Məhsulları oxuma xətası:', error);
        return [];
    }
}

// Məhsulları fayla yaz
async function writeProducts(products) {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// Bütün məhsulları qaytar
app.get('/api/products', async (req, res) => {
    try {
        const products = await readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Məhsullar yüklənə bilmədi' });
    }
});

// Yeni məhsul əlavə et
app.post('/api/products', async (req, res) => {
    try {
        const products = await readProducts();
        products.push(req.body);
        await writeProducts(products);
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Məhsul əlavə edilə bilmədi' });
    }
});

// Məhsulu redaktə et
app.put('/api/products/:id', async (req, res) => {
    try {
        const products = await readProducts();
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Məhsul tapılmadı' });
        }
        products[index] = req.body;
        await writeProducts(products);
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Məhsul redaktə edilə bilmədi' });
    }
});

// Məhsulu sil
app.delete('/api/products/:id', async (req, res) => {
    try {
        const products = await readProducts();
        const filteredProducts = products.filter(p => p.id !== req.params.id);
        await writeProducts(filteredProducts);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Məhsul silinə bilmədi' });
    }
});

// Ödəniş sessiyası yarat
app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'azn',
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'https://testab.netlify.app'}/success`,
            cancel_url: `${process.env.FRONTEND_URL || 'https://testab.netlify.app'}/cart.html`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Sessiya yaradılarkən xəta:', error);
        res.status(500).json({ error: 'Ödəniş sessiyası yaradıla bilmədi' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir`);
});