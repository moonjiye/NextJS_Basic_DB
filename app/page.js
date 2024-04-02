import { connectDB } from "@/util/database"

export default async function Home() {

  const db = await connectDB.db("my_mongo_db")
  let result = await db.collection('test').find().toArray();
  console.log(result)

  return (
    <div>안녕</div>
  )
}
