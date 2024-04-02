import { connectDB } from "@/util/database";

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  let result = await db.collection("test").find().toArray();

  return (
    <div className="list-bg">
      {result.map((a, i) => {
        return (
          <div className="list-item">
            <h4>{result[i].title}</h4>
            <p>4월 2일</p>
          </div>
        );
      })}
    </div>
  );
}
