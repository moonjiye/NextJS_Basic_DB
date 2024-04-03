import { connectDB } from "@/util/database";
import ListItem from "./ListItem.js";

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  )
}
