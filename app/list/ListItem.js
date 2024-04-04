"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((item, index) => (
        <div className="list-item" key={index}>
          <Link href={"/detail/" + result[index]._id}>
            <h4>{item.title}</h4>
          </Link>
          <Link href={"/edit/" + result[index]._id}>✏️</Link>
          <span 
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[index]._id,
              })
                // .then((r) => {
                //   if (r.status == 200) {
                //     return r.json();
                //   } else {
                //     //서버가 에러코드전송시 실행할코드
                //   }
                // })
                // .then(()=>{
                //     e.target.parentElement.style.opacity=0;
                //     setTimeout(()=>{
                //         e.target.parentElement.style.display='none';
                //     })

                // })
                // .then((result) => {
                //   //성공시 실행할코드
                // })
                // .catch((error) => {
                //   //인터넷문제 등으로 실패시 실행할코드
                //   console.log(error);
                // });
            }}
          >
            🗑️
          </span>
          <p>4월 4일</p>
        </div>
      ))}
    </div>
  );
}
