
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

        // let talls = await s.find({height:{$gt:170}}).toArray()
        // console.log(talls)

        // let talls_count = await s.countDocuments({height:{$gt:170}})
        // let total_count = await s.countDocuments({})
        // console.log(100*talls_count/ total_count)

        // let rounds = await s.find({height:{$mod:[10, 0]}}).toArray()
        // console.log(rounds)

        process.exit()

    } catch {
        console.log("Failed to connect to Mongo Server.")
    }
})()



