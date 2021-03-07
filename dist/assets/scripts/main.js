const express = require('express');
const fs = require('fs');
const path = require('path');
const news = require('./news');
const newsApp = require('./news');
const registro = require('./registro');
const app = express();
news(app);
var port = process.env.PORT || 3000;
app.use('/assets', express.static(path.join(__dirname, '../')));
app.get('/', (req, res) => {
    const params = req.query.search;
    console.log('Query Params: ', params);
    res.redirect('/news');
});
app.listen(port, () => {
    console.log('app is listening in port ' + port);
});
app.get('/register', (req, res) => {
    const params = req.query.search;
    registro(app);
    res.redirect('/registro');
});
