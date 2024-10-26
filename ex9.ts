
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

        // let noviolations = await s.find({violations:{$size:0}}).toArray()
        // console.log(noviolations)
        
        // let error = await s.find({violations:{$size:{$gt:1}}}).toArray()

        //calculate count: who has at least 2 violations by $or:

        // let atleastone = await s.countDocuments({$or:[{violations:{$size:0}}   , {violations:{$size:1}}]})
        // console.log(atleastone)

        // let atleastone = await s.countDocuments({$nor:[{violations:{$size:0}}   , {violations:{$size:1}}]})
        // console.log(atleastone)



        process.exit()

    } catch(e) {
        console.log("Something is wrong:", e)
    }
})()



