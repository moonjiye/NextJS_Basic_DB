import { connectDB } from "@/util/database"

export const revalidate = 60; // 페이지 방문시 캐싱

export default async function Home() {

  const db = (await connectDB).db("my_mongo_db")
  let result = await db.collection('test').find().toArray();
  console.log(result)

  // GET 요청결과 캐싱
  // await fetch('/api/어쩌구', { cache: 'force-cache' })

  return (
    <div>안녕</div>
  )
}
