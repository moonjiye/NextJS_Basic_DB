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
      <p>글제목: {result.title}</p>
      <p>글내용: {result.content}</p>
      <Comment parentId = {result._id.toString()} />
    </div>
  );
}
