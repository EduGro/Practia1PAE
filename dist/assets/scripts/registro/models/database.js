var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MongoClient = require('mongodb').MongoClient;
dotenv = require('dotenv');
dotenv.config();
class Database1 {
    constructor() {
        const url = process.env.url;
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                console.log('Failed to connect to the database');
                return;
            }
            const db = client.db();
            console.log('Connected to MongoDB successfully');
            this.collection = db.collection('usersProyect');
        });
    }
    useCollection(name) {
        this.collectionName = name;
    }
    find(filters) {
        console.log(filters);
        console.log(this.collection);
    }
    put(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            var ban = yield this.collection.insertOne(obj).then(result => {
                console.log(result);
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
            return ban;
        });
    }
}
module.exports = new Database1();
