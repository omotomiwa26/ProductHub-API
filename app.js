const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const productRoutes = require('./routes/product');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// home route
app.get('/api', (req, res) => {
    res.send('<h1 style="color: Gold";> WELCOME TO ProductHub-API!</h1>');

// Use All Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', productRoutes);
});

module.exports = app;
