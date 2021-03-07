var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const multer = require('multer');
const handlebars = require('express-handlebars');
app.use('/assets', express.static(path.join(__dirname, '../../')));
port = process.env.PORT || 3001;
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
const dotenv = require('dotenv');
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
app.post('/users', uploadFile.single('profilePic'), (req, res) => __awaiter(this, void 0, void 0, function* () {
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
    var ban = yield Database.put(obj);
    console.log('ban ' + ban);
    if (ban) {
        res.sendFile(path.join(__dirname, 'views', 'userCreated.html'));
    }
    else {
        res.end('There was an error on the database');
    }
}));
app.listen(port, () => {
    console.log(`app is listening in port ${port}`);
});

module.exports = function (app) {
    port = process.env.PORT || 3001;
    app.get('/registro', (req, res) => {
        //console.log('Query params: ', req.query);
        res.sendFile(path.join(__dirname, '../../../registro.html'));
    });
};

