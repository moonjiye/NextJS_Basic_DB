'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"

export default function DetailLink() {
  const router = useRouter()          // 페이지이동
  const curPath = usePathname()       // 현재 URL 출력
  const queryStr = useSearchParams()  // 쿼리스트링
  return (
   <button onClick={() => { router.push('/') }}>버튼</button>
  )
}