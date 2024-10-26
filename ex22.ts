
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import fs from 'fs'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'

(async () => {

  let db = JSON.parse(fs.readFileSync("./students.json", "utf8"))
  let target = db.filter(st=>  st.height > 160).map(st=> st.height)
 

  let sum=0
  for(let ghad of target)
    if(ghad%2==0)
  {
     sum+= ghad
  }

  console.log(sum)
})()



