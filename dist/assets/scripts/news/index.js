module.exports = function (app) {
    app.get('/news', (req, res) => {
        const fs = require('fs');
        const newsFile = fs.readFileSync('../../news.html');
        res.end(newsFile);
    });
};
