//const bodyParser = require('body-parser');
express = require('express');
fs = require('fs');
path = require('path');
app = express();
var multer = require('multer');
app.use('/assets', express.static(path.join(__dirname, '../')));
port = process.env.PORT || 3000;

const handlebars = require('express-handlebars');

app.use(express.static(path.join(__dirname + '../../../registro.html')));

port = process.env.PORT || 3001;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
var dotenv = require('dotenv');

const Database = require(path.join(__dirname + '/models/database.js'));

dotenv.config();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        console.log('File', file);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};

const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});

app.get('/registro', (req, res) => {
    //console.log('Query params: ', req.query);
    res.sendFile(path.join(__dirname, '../../../registro.html'));
});

app.post('/users', uploadFile.single('profilePic'), async (req, res) => {
    //console.log('Body params: ', req.body, req.file);
    var obj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
    };
    var ban = await Database.put(obj);
    console.log('ban ' + ban);
    if (ban) {
        res.sendFile(path.join(__dirname,'views','userCreated.html'));
    } else {
        res.end('There was an error on the database');
    }
})

app.listen(port, () => {
    console.log(`app is listening in port ${port}`);
})

module.exports = function (app) {
    port = process.env.PORT || 3001;
    app.get('/registro', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../registro.html'));
    });
};

