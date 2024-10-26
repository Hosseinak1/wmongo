
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import fs from 'fs'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'

const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
};

(async () => {

    const client = new MongoClient(process.env.MONGOURL);

    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
        const db = client.db(process.env.MONGODB_DB);

        let s = await db.collection("students")

        let super_talls = await s.find({height:{$gt:185}}).toArray()
        let super_shorts = await s.find({height:{$lt:156}}).toArray()
        let supers = [...super_talls, ...super_shorts]
        console.log(supers)


        // let supers_or = await s.find({$or:[{height:{$gt:185}} , {height:{$lt:156}} ]}).toArray()
        // console.log(supers_or)

        //do it by find({}) and for loop in ts?

        process.exit()

    } catch {
        console.log("Failed to connect to Mongo Server.")
    }
})()



