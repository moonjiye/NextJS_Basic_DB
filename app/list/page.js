import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("my_mongo_db");
  let result = await db.collection("test").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, index) => {
        return (
          <div className="list-item" key={index}>
            <Link href={'/detail/'+result[index]._id}>
              <h4>{item.title}</h4>
            </Link>
            <DetailLink />
            <p>4월 2일</p>
          </div>
        );
      })}
    </div>
  );
}
