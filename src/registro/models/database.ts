const MongoClient = require('mongodb').MongoClient;
dotenv = require('dotenv');
dotenv.config();
class Database1 {
    db;

    collectionName;

    collection;

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

    async put(obj) {
            var ban = await this.collection.insertOne(obj).then(result => {
                console.log(result);
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
        return ban;
    }
}

module.exports = new Database1();