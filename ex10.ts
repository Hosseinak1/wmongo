
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

        let goodmaths = await s.find({exam:{$elemMatch:{name:"math", score:{$gt:80}}}}).toArray()
        console.log(goodmaths)
        
        // console.log(JSON.stringify(goodmaths, null , 2))
        
        process.exit()

    } catch(e) {
        console.log("Something is wrong:", e)
    }
})()



