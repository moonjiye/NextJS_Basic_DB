import { connectDB } from "@/util/database";
import ListItem from "./ListItem.js";

// static에서 dynamic rendering으로 바꾸려면,,
// dynamic이라는 예약된 변수명 사용.
export const dynamic = 'force-dynamic'

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  )
}
