import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // 위조할 수 있기 때문에 server에서 가져옴
  let session = await getServerSession(req, res, authOptions);

  console.log("session :", session);
  console.log(req.body);

  if (session != null) {
    // POST 요청을 하면, comment 라는 컬렉션에 document를 발행해서 저장
    if (req.method == "POST") {
      req.body = JSON.parse(req.body);
      let save = {
        content: req.body.comment,
        parent: new ObjectId(req.body._id),
        author: session.user.email,
      };

      const db = (await connectDB).db("my_mongo_db");
      let result = await db.collection("comment").insertOne(save);
      res.status(200).json("저장완료");
    }
  }
}
