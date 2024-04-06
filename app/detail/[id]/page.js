import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  const db = (await connectDB).db("my_mongo_db")
  const result = await db.collection("post").findOne({ 
    _id : new ObjectId(props.params.id)})
  console.log(props);

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <Comment />
    </div>
  );
}
