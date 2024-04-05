import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    
  if (req.method == "POST") {

    // 빈 공간 체크
    const requiredFields = ['name', 'email', 'password'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field}이(가) 빈 공간입니다.` });
      }
    }

    const db = (await connectDB).db("my_mongo_db");

    // 중복 체크
    const isUser = await db.collection("user_info").findOne( {email: req.body.email})
    console.log(isUser)
    if (isUser) {
        return res.status(400).json({ error: '이미 존재하는 아이디입니다.' });
      }

    // 비밀번호 암호화
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    console.log(hash)
    console.log(req.body)
    
   
    const result = await db.collection("user_info").insertOne(req.body);
    res.status(200).json('성공');
  }
}
