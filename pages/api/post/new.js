import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // let session = await getServerSession(req, res, authOptions)
  // console.log(session.user.email)

  if (req.method == "POST") {
    console.log(req.body);
    try {
      if (req.body.title !== "") {
        const db = (await connectDB).db("my_mongo_db");
        const result = await db.collection("post").insertOne(req.body);
        console.log(result)
        return res.status(200).redirect("/list");
      } else {
        return res.status(500).json("제목을 입력해주세요");
      }
    } catch (error) {
      // DB 에러시 실행할 코드
      console.error("에러가 발생했습니다: ", error);
    }
  }
}
